//缓存模块
const NodeCache = require("node-cache");
//缓存时间 stdTTL：0 不过期,checkperiod：0不校验
const cache = new NodeCache({
    stdTTL: 1800,
    checkperiod: 300
});
const config = require('./config')
const redis = require('./redis');
import {
    SQL_TYPE,
    CACHE_TYPE
} from './constant'
import * as model from './model'
import {
    refresh
} from "./refresh";
//设置缓存内容
export async function set(key, value) {
    return cache.set(key, value);
}
//获取缓存内容
export async function get(key) {
    var t = cache.get(key);
    if (Object.prototype.toString.call(t) != "[object Array]" || !t) {
        var sql = '';
        switch (key) {
            case CACHE_TYPE.systemConfig:
                sql = SQL_TYPE.GET_SYSTEM_CONFIG
                break;
            case CACHE_TYPE.api:
                sql = SQL_TYPE.GET_API
                break;
            case CACHE_TYPE.apiList:
                sql = SQL_TYPE.GET_API_LIST
                break;
        }
        let data = await model.query(sql);
        cache.set(key, data ? data : []);
    }
    return cache.get(key)
}

//过期
cache.on("expired", async function(key, value) {
    refresh();
});
module.exports = {
    set: config.redis ? redis.set : set,
    get: config.redis ? redis.get : get,
}