import {SQL_TYPE} from '../../lib/constant'
const model = require('../../lib/model')
describe("model", function() {
	let data = void(0)
	console.log('\x1B[32m\x1B[32m','start...model...test...');
	beforeEach( async function() {
		//获取api列表
		data = await model.query(SQL_TYPE.GET_API)
	});
	it("query method can return an array or an object",async function() {
		expect(Object.prototype.toString.call(data)).toEqual("[object Array]");
	});
})