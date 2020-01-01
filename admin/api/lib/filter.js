import {CACHE_TYPE , MESSAGE , API_TYPE} from './constant'
import setRes from './response'
import {getter} from './getter'
import {toSignStr} from './utils'
const config = require('./config')
//定义私有属性key
const path = Symbol('path');
const accessSecret = Symbol('accessSecret');
var filterAction = void(0);
class apiFilter {
	constructor(p,_path) {
		for(let key in p){
			this[key] = p[key]
		}
		//给私有属性赋值
		this[path] = _path;
		this[accessSecret] = void(0)
	}
	//验证公共参数是否存在
	publicParamsExistVerify(){
		const errorObj = {}
		if(!this.timestamp){
			return Object.assign(errorObj,MESSAGE.LOSE_PUBLIC_PARAMS,{replace:'timestamp'})
		}
		//校验签名
		if(!this.sign){
			return Object.assign(errorObj,MESSAGE.LOSE_PUBLIC_PARAMS,{replace:'sign'})
		}
		//校验版本号
		if(!this.v){
			return Object.assign(errorObj,MESSAGE.LOSE_PUBLIC_PARAMS,{replace:`v`})
		}
		//校验id
		if(!this.id){
			return Object.assign(errorObj,MESSAGE.LOSE_PUBLIC_PARAMS,{replace:'id'})
		}
		//校验key
		if(!this.key){
			return Object.assign(errorObj,MESSAGE.LOSE_PUBLIC_PARAMS,{replace:`key`})
		}
		return 'next'
	}
	//验证公共参数格式是否正确
	publicParamsVerify(){
		const errorObj = {}
		//校验时间戳格式
		let _t = this.timestamp / 1.0
		if(!/^[0-9]{10}$/.test(_t)){
			return Object.assign(errorObj,MESSAGE.PUBLIC_PARAMS_ERROR,{replace:`timestamp:${this.timestamp}`})
		}
		//校验签名
		if(Object.prototype.toString.call(this.sign) != "[object String]"){
			return Object.assign(errorObj,MESSAGE.PUBLIC_PARAMS_ERROR,{replace:`sign:${this.sign}`})
		}
		//校验版本号
		if(!/\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0/.test(this.v)){
			return Object.assign(errorObj,MESSAGE.PUBLIC_PARAMS_ERROR,{replace:`v:${this.v}`})
		}
		//校验key
		if(Object.prototype.toString.call(this.key) != "[object String]"){
			return Object.assign(errorObj,MESSAGE.PUBLIC_PARAMS_ERROR,{replace:`key:${this.key}`})
		}
		return 'next'
	}
	//验证时间戳
	timestampVerify(){
		let now = parseInt(new Date().getTime() / 1000);
		if (Math.abs(now - this.timestamp) > 60 * 10) {
			return MESSAGE.TIMEOUT
		}
		return 'next'
	}
	//验证id
	async idVerify(){
		let res = (await getter(CACHE_TYPE.systemConfig)({id:this.id})).firstOrDefault()
		if(!res)
			return MESSAGE.INVALID_ID
		return 'next'
	}
	//验证key
	async keyVerify(){
		let res = (await getter(CACHE_TYPE.systemConfig)({access_key:this.key, id:this.id})).firstOrDefault()
		if(!res)
			return MESSAGE.INVALID_KEY
		let now = new Date().getTime();
		let expiredTime = new Date(res.expired_time).getTime()
		//验证key是否超过有效期
		if(now > expiredTime)
			return MESSAGE.KEY_OVERTIME
		this[accessSecret] = res.access_secret
		return 'next'
	}
	//校验访问api权限
	async apiVerify(){
		let api = (await getter(CACHE_TYPE.api)({path:this[path],system_id:this.id})).firstOrDefault();
		if(!api)
			return MESSAGE.UNAUTH_METHOD
		if(api.status != API_TYPE.STABLE){
			switch(api.status){
				case API_TYPE.INVALID:
					return MESSAGE.INTERFACE_INVALID
				case API_TYPE.TEMP_CLOSE:
					return MESSAGE.INTERFACE_TEMP_CLOSE
				default:
					return MESSAGE.SYSTEM_ERROR
			}
		}
		return 'next'
	}
	//验证签名
	signVerify(){
		let _sign = toSignStr(this,this[accessSecret]);
		return _sign == this.sign ? 'next' : MESSAGE.SIGNATURE_INVALID
	}
	execute(){
		let _ = this
		let r = _.publicParamsExistVerify.next(_.publicParamsVerify).next(_.timestampVerify).next(_.idVerify).next(_.keyVerify).next(_.apiVerify).next(_.signVerify)
		return r(_)
	}
}
(function(){
	//根据配置判断框架
	switch(config.framework){
		case "koa":
			filterAction = async function(ctx,next){
				let f = new apiFilter(getParams(ctx.request),ctx.request.path);
				let n = await needAuth(ctx.request.path)
				//不需要校验的api
				if(!n){
					return true;
				}
				let err = await f.execute()
				if(err && err.msg){
					setRes(ctx,err)
					return false
				}
				return true;
			}
		break;
		case "express":
			filterAction = async function(req,res,next){
				let f = new apiFilter(getParams(req),req.path);
				let n = await needAuth(req.path)
				//不需要校验的api
				if(!n){
					return true;
				}
				let err = await f.execute()
				if(err && err.msg){
					setRes(res,err)
					return false
				}
				return true;
			}
		break;
		default:
			filterAction = new Function();
		break;
	}
})()
function getParams(req){
	let params = req.body || req.query
	return Object.assign({},params)
}
async function needAuth(path){
	let apiList = (await getter(CACHE_TYPE.apiList,'')).all();
	if(!apiList || Object.prototype.toString.call(apiList) != '[object Array]')
		return false
	let r = apiList.some((t)=>{
		return path == t.path
	})
	return r
}
Function.prototype.next = function(fn) {
    let self = this;
    return async function(_) {
		let ret = await self.apply(_, arguments);
        if(ret == "next") {
            return await fn.apply(_, arguments);
        }
        return ret;
    };
}
export default filterAction