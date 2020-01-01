const config = require('./config')
import {createRequestId} from './utils'

let setRes = void(0);
(function(){
	//根据配置判断框架
	switch(config.framework){
		case "koa":
			setRes = function(ctx,message,data){
				let response = {}
				if(message.replace){
					message.msg = message.msg.replace('@_@',message.replace)
					delete message.replace
				}
				response = {
					'response':Object.assign(message,{request_id:createRequestId()})
				}
				if(data){
					response = Object.assign(response,{'Resultdata':data})
				}
				ctx.body = response
			}
		break;
		case "express":
			setRes = function(res,message,data){
				let response = {}
				if(message.replace){
					message.msg = message.msg.replace('@_@',message.replace);
					delete message.replace
				}
				response = {
					'response':Object.assign(message,{request_id:createRequestId()})
				}
				if(data){
					response = Object.assign(response,{'Resultdata':data})
				}
				res.end(JSON.stringify(response));
			}
		break;
		default:
			setRes = new Function();
		break;
	}
})()

export default setRes