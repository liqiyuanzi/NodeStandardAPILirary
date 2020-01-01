
describe("database", function() {
	var database = require('../../lib/database');
	console.log('\x1B[32m\x1B[32m','start...database...test...');
	it("should be an object", function() {
		var value = Object.prototype.toString.call(database);
		expect(value).toEqual('[object Object]');
	});
	it("query should be an function", function() {
		var value = Object.prototype.toString.call(database.query);
		expect(value).toEqual('[object Function]');
	});
})