import {isJSON} from './utils'
const redis = require("redis");
const env = require('../env.cnf');
const TABLE_NAME = "COMMON_API_"
const config = require('./config')

var client = void(0)
var db = {};
(function(){
    if(config.redis){
        client = redis.createClient(env.REDIS.PORT, env.REDIS.HOST, { db: env.REDIS.SELECT_DB || 0 });
        if (env.REDIS.AUTH) {
            client.auth(env.REDIS.AUTH);
        }
        client.on("error", function(err) {
            console.log("redisError :", err);
        });
        client.on('connect', function() {
            console.log('Redis连接成功...');
        })
    }
})()


/** 
 * 添加string类型的数据 
 * @param key 键 
 * @params value 值  
 */
db.set = async function(key, value) {
    return new Promise((resolve, reject) => {
        let code = TABLE_NAME;
        let keys = code + key;
        if(Object.prototype.toString.call(value) == '[object Object]' || Object.prototype.toString.call(value) == '[object Array]'){
            value = JSON.stringify(value)
        }
        client.set(keys, value, function(err, result) {
            if (err) {
                console.log(err);
                reject()
                return;
            }
            resolve()
        })
    });
}
/** 
 * 查询string类型的数据 
 * @param key 键
 */
db.get = function(key) {
    return new Promise((resolve, reject) => {
        let code = TABLE_NAME;
        client.get(code + key, function(err, result) {
            if (err) {
                console.log(err);
                reject()
                return;
            }
            if(isJSON(result)){
                result = JSON.parse(result)
            }
            resolve(result)
        });
    });
}
/** 
 * 删除redis内容
 * @param key 键 
 */
db.delete = function(key) {
    return new Promise((resolve, reject) => {
        let code = TABLE_NAME;
        client.expire(code + key, 1);
        resolve()
    });
}

module.exports = { set: db.set, get: db.get, delete: db.delete };