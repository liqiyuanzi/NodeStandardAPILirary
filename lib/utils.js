const crypto = require('crypto');
var iconv = require('iconv-lite');
export const curry = function(func) {
        var length = func.length;
        args = args || [];
        return function() {
            newArgs = args.concat([].slice.call(arguments));
            if (newArgs.length < length) {
                return curry.call(this, func, newArgs);
            } else {
                return func.apply(this, newArgs);
            }
        }
    }
    //sha1加密
export const sha1 = function(app_secret, str) {
    str = iconv.encode(str, 'utf8');
    str = crypto.createHmac('sha1', app_secret).update(str).digest('hex')
    str = new Buffer(str).toString('base64');
    return str
}
export const toSignStr = function(comingJson, secret) {
        let cryptoArr = new Array();
        for (let key in comingJson) {
            //不把sign作为加密项
            if (key != 'sign') {
                cryptoArr.push(key + '=' + comingJson[key]);
            }
        }
        cryptoArr = cryptoArr.sort()
        let signStr = cryptoArr.join('&')
        return sha1(secret, signStr);
    }
    //requestid生成算法
export const createRequestId = function(len = 32, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
    //判断是否为json字符串
export const isJSON = function(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            return false;
        }
    }
}