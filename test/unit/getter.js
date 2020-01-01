
import {getter} from '../../lib/getter'
import * as cache from '../../lib/cache'
describe("getter", function() {
	let res = void(0)
	console.log('\x1B[32m\x1B[32m','start...getter...test...');
	beforeEach(async function() {
		//使用cache模块set方法存入一个数组
		await cache.set('mytest',[{
			x:1,y:2,z:3,xx:1,yy:2,zz:3
		},{
			x:2,y:2,z:2,xx:2,yy:22,zz:33
		},{
			x:2,y:3,z:2,xx:2,yy:22,zz:33
		}]);
	});
	it("firstOrDefault method should return an object",async function() {
		res = (await getter('mytest')({x:1,y:2,z:3})).firstOrDefault()
		//获取唯一值
		expect(Object.prototype.toString.call(res)).toEqual('[object Object]');
		var str = JSON.stringify(res);
		var expectStr = JSON.stringify({
			x:1,y:2,z:3,xx:1,yy:2,zz:3
		});
		expect(str).toEqual(expectStr);
	});
	it("top method should return an array contains at least one item",async function() {
		res = (await getter('mytest')({y:2})).top(10)
		//获取一组值
		var str = JSON.stringify(res);
		var expectStr = JSON.stringify([{
			x:1,y:2,z:3,xx:1,yy:2,zz:3
		},{
			x:2,y:2,z:2,xx:2,yy:22,zz:33
		}]);
		expect(str).toEqual(expectStr);
	});
	it("all method should return all data",async function() {
		res = (await getter('mytest','')).all()
		//获取全部内容
		var str = JSON.stringify(res);
		var expectStr = JSON.stringify([{
			x:1,y:2,z:3,xx:1,yy:2,zz:3
		},{
			x:2,y:2,z:2,xx:2,yy:22,zz:33
		},{
			x:2,y:3,z:2,xx:2,yy:22,zz:33
		}]);
		expect(str).toEqual(expectStr);
	});
})