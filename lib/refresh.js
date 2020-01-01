const events = require('events');
const config = require('./config')
import * as model from './model'
import {
    CACHE_TYPE,
    SQL_TYPE
} from './constant'
import * as cache from './cache'
import * as redis from './redis'

let emitter = new events.EventEmitter();
emitter.on('refresh', async(type) => {
    if (CACHE_TYPE.api in type) {
        let data = await model.query(SQL_TYPE.GET_API);
        config.redis ?
            redis.set(CACHE_TYPE.api, data) :
            cache.set(CACHE_TYPE.api, data)
    }
});
emitter.on('refresh', async(type) => {
    if (CACHE_TYPE.systemConfig in type) {
        let data = await model.query(SQL_TYPE.GET_SYSTEM_CONFIG);
        config.redis ?
            redis.set(CACHE_TYPE.systemConfig, data) :
            cache.set(CACHE_TYPE.systemConfig, data)
    }
});
emitter.on('refresh', async(type) => {
    if (CACHE_TYPE.apiList in type) {
        let data = await model.query(SQL_TYPE.GET_API_LIST);
        config.redis ?
            redis.set(CACHE_TYPE.apiList, data) :
            cache.set(CACHE_TYPE.apiList, data)
    }
});
//初始化api相关配置
export async function init() {
    await refresh();
}
export async function refresh(type = CACHE_TYPE) {
    emitter.emit('refresh', type);
}