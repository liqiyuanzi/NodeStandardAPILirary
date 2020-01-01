import sequelize from '../config/database'
import DataTypes from 'sequelize'
import moment from "moment";
import {refresh} from "../lib/refresh";
import {CACHE_TYPE} from '../lib/constant'
var standard_api_api = require('../models/standard_api_api.js')(sequelize,DataTypes);
var standard_api_system_api_mapping = require('../models/standard_api_system_api_mapping.js')(sequelize,DataTypes);
var standard_api_system_config = require('../models/standard_api_system_config.js')(sequelize,DataTypes);
var standard_api_system = require('../models/standard_api_system.js')(sequelize,DataTypes);
//定义关联
standard_api_system_config.belongsTo(standard_api_system,{foreignKey: 'system_id',as: 'system'});
standard_api_system_api_mapping.belongsTo(standard_api_api,{foreignKey: 'api_id',as: 'api'});
standard_api_system_api_mapping.belongsTo(standard_api_system,{foreignKey: 'system_id',as: 'system'});
function setError(ctx,msg){
    ctx.body = {code: 500,msg: msg}
}
/**
 * 获取api列表 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function apiList(ctx,next) {
    try {
        let currentPage = ctx.request.body.currentPage ? ctx.request.body.currentPage : 1;
        let pageSize = ctx.request.body.pageSize ? ctx.request.body.pageSize : 10;
        let res = await standard_api_api.findAndCountAll({
            where:'',
            offset:(currentPage - 1) * pageSize,
            limit:pageSize
        });
        ctx.body = {code: 200,msg: '',data:res.rows,total:res.count}
    } catch (err) {
        setError(ctx,'系统异常')
    }
}
/**
 * 添加api 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function addApi(ctx,next) {
    try {
        let path = ctx.request.body.path;
        let name = ctx.request.body.name;
        let status = ctx.request.body.status / 1.0;

        if(!/^\/\w+/.test(path)){
            setError(ctx,'路径格式错误！')
            return
        }
        if(!name){
            setError(ctx,'名称不可空！')
            return
        }
        if (isNaN(status) || !(toString.call(status) == "[object Number]")) {
            setError(ctx,'状态异常！')
            return
        }
        await standard_api_api.create({
            'path': path,
            'name': name,
            'status': status
        })
        
        ctx.body = {code: 200,msg: '添加成功'}
        refresh(CACHE_TYPE)
    } catch (err) {
        setError(ctx,'系统异常')
    }
}
/**
 * 查询api详情 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function getApi(ctx,next) {
    try {
        let id = ctx.request.body.id;

        if(!id){
            setError(ctx,'无此api信息')
            return
        }
        let api = await standard_api_api.findOne({
            where: {
                id: id
            }
        });
        
        if(!api){
            setError(ctx,'无此api信息')
            return
        }
        ctx.body = {code: 200,msg: '',data:api}
    } catch (err) {
        setError(ctx,'系统异常')
    }
}
/**
 * 编辑api 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function editApi(ctx,next) {
    try {
        let id = ctx.request.body.id;
        let path = ctx.request.body.path;
        let name = ctx.request.body.name;
        let status = ctx.request.body.status / 1.0;
        if(!id){
            setError(ctx,'无此api信息')
            return
        }
        if(!/^\/\w+/.test(path)){
            setError(ctx,'路径格式错误！')
            return
        }
        if(!name){
            setError(ctx,'名称不可空！')
            return
        }
        if (isNaN(status) || !(toString.call(status) == "[object Number]")) {
            setError(ctx,'状态异常！')
            return
        }
        let res = await standard_api_api.update({
            'path': path,
            'name': name,
            'status': status,
        }, {
            where: {
                id: id
            }
        })

        if(!res){
            setError(ctx,'修改失败')
            return
        }
        ctx.body = {
            code: 200,
            msg: '修改成功'
        }
        refresh(CACHE_TYPE)
    } catch (err) {
        setError(ctx,'系统异常')
    }
}
/**
 * 获取system列表 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function systemList(ctx,next) {
    try {
        let currentPage = ctx.request.body.currentPage ? ctx.request.body.currentPage : 1;
        let pageSize = ctx.request.body.pageSize ? ctx.request.body.pageSize : 10;

        let res = await standard_api_system.findAndCountAll({
            where:'',
            offset:(currentPage - 1) * pageSize,
            limit:pageSize,
            attributes: ['id','name',['system_id', 'systemId'],'status']
        });
        ctx.body = {
            code: 200,
            msg: '',
            data:res.rows,
            total:res.count
        }
    } catch (err) {
        setError(ctx,'系统异常')
    }
}
/**
 * 添加system 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function addSystem(ctx,next) {
    try {
        let name = ctx.request.body.name;
        let systemId = ctx.request.body.systemId;
        let status = ctx.request.body.status / 1.0 ;

        if(!name){
            setError(ctx,'名称不可空！')
            return
        }
        if(!systemId){
            setError(ctx,'系统ID不可空！')
            return
        }
        if (isNaN(status) || !(toString.call(status) == "[object Number]")) {
            setError(ctx,'状态无效！')
            return
        }
        await standard_api_system.create({
            'system_id': systemId,
            'name': name,
            'status': status
        })
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }
        refresh(CACHE_TYPE)
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}
/**
 * 查询system详情 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function getSystem(ctx,next) {
    try {
        let id = ctx.request.body.id;

        if(!id){
            setError(ctx,'无此api信息')
            return
        }
        let api = await standard_api_system.findOne({
            where: {
                id: id
            },
            attributes: ['id','name',['system_id', 'systemId'],'status']
        });
        if(!api){
            setError(ctx,'无此api信息')
            return
        }
        ctx.body = {
            code: 200,
            msg: '',
            data:api
        }
    } catch (err) {
        setError(ctx,'系统异常')
    }
}
/**
 * 编辑system
 * @param {*} ctx 
 * @param {*} next 
 */
export async function editSystem(ctx,next) {
    try {
        let id = ctx.request.body.id;
        let systemId = ctx.request.body.systemId;
        let name = ctx.request.body.name;
        let status = ctx.request.body.status / 1.0;
        if(!id){
            setError(ctx,'无此api信息')
            return
        }
        if(!name){
            setError(ctx,'名称不可空！')
            return
        }
        if(!systemId){
            setError(ctx,'系统ID不可空！')
            return
        }
        if (isNaN(status) || !(toString.call(status) == "[object Number]")) {
            setError(ctx,'状态异常！')
            return
        }
        await standard_api_system.update({
            'system_id': systemId,
            'name': name,
            'status': status,
        }, {
            where: {
                id: id
            }
        })
        ctx.body = {
            code: 200,
            msg: '修改成功'
        }
        refresh(CACHE_TYPE)
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}
/**
 * 获取systemConfig列表 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function systemConfigList(ctx,next) {
    try {
        let currentPage = ctx.request.body.currentPage ? ctx.request.body.currentPage : 1;
        let pageSize = ctx.request.body.pageSize ? ctx.request.body.pageSize : 10;

        let res = await standard_api_system_config.findAndCountAll({
            where:'',
            offset:(currentPage - 1) * pageSize,
            limit:pageSize,
            include:[{
                    model:standard_api_system,
                    required:false,
                    as:'system'
                }]
             })
        ctx.body = {
            code: 200,
            msg: '',
            data:res.rows,
            total:res.count
        }
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}
/**
 * 添加systemConfig 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function addSystemConfig(ctx,next) {
    try {
        let systemId = ctx.request.body.systemId;
        let accessKey = ctx.request.body.accessKey;
        let accessSecret = ctx.request.body.accessSecret;
        let expiredTime = ctx.request.body.expiredTime;
        
        if(Object.prototype.toString.call(accessKey) != "[object String]"){
            setError(ctx,'accessKey不可空')
            return
        }
        if(Object.prototype.toString.call(accessSecret) != "[object String]"){
            setError(ctx,'accessSecret不可空')
            return
        }
        if (!systemId) {
            setError(ctx,'系统id无效')
            return
        }
        if (!expiredTime) {
            setError(ctx,'过期时间无效')
            return
        }
        expiredTime = moment(expiredTime).utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')

        await standard_api_system_config.create({
            'system_id': systemId,
            'access_key': accessKey,
            'access_secret': accessSecret,
            'expired_time': expiredTime
        })
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }
        refresh(CACHE_TYPE)
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}
/**
 * 查询systemConfig 详情 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function getSystemConfig(ctx,next) {
    try {
        let id = ctx.request.body.id;

        if(!id){
            setError(ctx,'无此api信息')
            return
        }
        let api = await standard_api_system_config.findOne({
            where:{id:id},
            include:[{
                    model:standard_api_system,
                    required:false,
                    as:'system'
                }]
             }) 
        
        if(!api){
            setError(ctx,'无此系统配置信息')
            return
        }
        ctx.body = {
            code: 200,
            msg: '',
            data:api
        }
    } catch (err) {
        setError(ctx,'系统异常')
    }
}
/**
 * 编辑systemConfig 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function editSystemConfig (ctx,next) {
    try {
        let id = ctx.request.body.id;
        let accessKey = ctx.request.body.accessKey;
        let systemId = ctx.request.body.systemId;
        let accessSecret = ctx.request.body.accessSecret;
        let expiredTime = ctx.request.body.expiredTime;

        if(Object.prototype.toString.call(accessKey) != "[object String]"){
            setError(ctx,'accessKey不可空')
            return
        }
        if(Object.prototype.toString.call(accessSecret) != "[object String]"){
            setError(ctx,'accessSecret不可空')
            return
        }
        if (!systemId) {
            setError(ctx,'系统id无效')
            return
        }
        if (!expiredTime) {
            setError(ctx,'过期时间无效')
            return
        }
        expiredTime = moment(expiredTime).utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')

        await standard_api_system_config.update({
            'system_id': systemId,
            'access_key' : accessKey,
            'access_secret' : accessSecret,
            'expired_time' : expiredTime
        }, {
            where: {
                id: id
            }
        })
        ctx.body = {
            code: 200,
            msg: '修改成功'
        }
        refresh(CACHE_TYPE)
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}
/**
 * 添加api system mapping 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function addSystemApiMapping (ctx,next) {
    try {
        let apiId = ctx.request.body.apiId;
        let systemId = ctx.request.body.systemId;
  
        if (!systemId) {
            setError(ctx,'系统id无效')
            return
        }
        if (!apiId) {
            setError(ctx,'id无效')
            return
        }
        let res = await standard_api_system_api_mapping.findOne({
            where:{api_id:apiId,system_id:systemId}
        }) 
        
        if(res){
            setError(ctx,'已添加过该映射关系')
            return 
        }
        await standard_api_system_api_mapping.create({
            'system_id': systemId,
            'api_id': apiId
        })
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }
        refresh(CACHE_TYPE)
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}
/**
 * 查询 api system mapping 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function getSystemApiMapping (ctx,next) {
    try {
        let id = ctx.request.body.id;
  
        if (!id) {
            setError(ctx,'获取映射关系失败')
            return
        }
        let res = await standard_api_system_api_mapping.findAll({
            where:'',
            include:[{
                    model:standard_api_api,
                    required:false,
                    as:'api'
                },{
                    model:standard_api_system,
                    required:false,
                    as:'system',
                    where:{id:id}
                }]
             })
        ctx.body = {
            code: 200,
            msg: '',
            data:res
        }
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}
/**
 * 删除 api system mapping 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function deleteSystemApiMapping (ctx,next) {
    try {
        let id = ctx.request.body.id;

        if (!id) {
            setError(ctx,'获取映射关系失败')
            return
        }
        standard_api_system_api_mapping.destroy({
            where: {
                id: id
            }
          })
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }
        refresh(CACHE_TYPE)
    } catch (err) {
        console.log(err)
        setError(ctx,'系统异常')
    }
}