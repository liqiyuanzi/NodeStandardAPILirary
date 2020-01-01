//缓存模块
const NodeCache = require("node-cache");
//缓存时间 stdTTL：0 不过期,checkperiod：0不校验
const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const config = require('./config')
const redis = require('./redis');
//设置缓存内容
export async function set(key, value) {
	return cache.set(key, value);
}
//获取缓存内容
export async function get(key) {
	return cache.get(key)
}
module.exports = {
    set : config.redis ? redis.set : set ,
    get : config.redis ? redis.get : get,
}