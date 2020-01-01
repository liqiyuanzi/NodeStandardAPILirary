const config = require('../../lib/config')
describe("redis", async function() {
	if(config.redis){
		var redis = require('../../lib/redis');
		console.log('\x1B[32m\x1B[32m','start...redis...test...');

		beforeEach(async function() {
			//redis存入字符串及json数据
			await redis.set('testKey1','testValue');
			await redis.set('testKey2',{a:1,b:2});
		});
		it("should return an object or a string",async function() {
			var value1 = await redis.get('testKey1');
			var value2 = await redis.get('testKey2');
			expect(value1).toEqual('testValue');
			value2 = JSON.stringify(value2);
			expect(value2).toEqual(JSON.stringify({a:1,b:2}));
		});
	}
})