
describe("cache", function() {
	var cache = require('../../lib/cache');
	console.log('\x1B[32m\x1B[32m','start...cache...test...');

	beforeEach(async function() {
		//使用cache模块的set方法存储字符串'testValue'
		await cache.set('testKey','testValue');
	});
	it("should be able to get a testValue",async function() {
		var value = await cache.get('testKey');
		expect(value).toEqual('testValue');
	});
})