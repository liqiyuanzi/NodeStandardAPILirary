import sequelize from '../config/database'
import moment from "moment";
import setRes from '../lib/response'
/**
 * 获取api列表 
 * @param {*} ctx 
 * @param {*} next 
 */
export async function tempMethod(ctx,next) {
    try {
        console.log(111,ctx.request,222)
        setRes(ctx,{code:200,msg:'成功'},{x:1,y:2})
    } catch (err) {
        ctx.body = {
            code: 500,
            msg: '系统异常'
        }
    }
}