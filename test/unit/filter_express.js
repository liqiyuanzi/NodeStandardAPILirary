
import {toSignStr} from '../../lib/utils'
import setRes from '../../lib/response'
const config = require('../../lib/config')
if(config.framework == 'express'){
	describe("express_filter", function() {
		let req = {
			path:'',
			query:{},
			body:{}
		};
		let res = {
			body:'',
			end:function(str){
				this.body = JSON.parse(str)
			}
		}
		let next = new Function();
	
		let filter = void(0);
		console.log('\x1B[32m\x1B[32m','start...express_filter...test...');
	
		beforeEach(function() {
			filter = require('../../lib/filter').default
		});
		it("should be a function",async function() {
			//filter为function
			expect(Object.prototype.toString.call(filter)).toEqual('[object Function]');
		});
		//缺少参数
		describe("test error 402.7.1", function() {
			let _res = Object.assign({},res)
			beforeEach(async function() {
				req = {
					path:'/api/test2',
					query:{
						id:1,
						key:'A87DASDW2A',
						method:'test',
						sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
						timestamp:'1550477118'
					}
				}
				await filter(req,_res,next)
			});
			it("should get 402.7.1 error", function() {
				expect(_res.body.response.code).toEqual('402.7.1')
	
			});
		});
		//参数格式错误
		describe("test error 402.7.3", function() {
			
			let _res = Object.assign({},res)
			beforeEach(async function() {
				req.query.v = 'ssss'
				await filter(req,_res,next)
			});
			it("should get 402.7.3 error", function() {
				expect(_res.body.response.code).toEqual('402.7.3')
			});
		});
			
		//时间戳超时错误
		describe("test error 402.5", function() {
			let _res = Object.assign({},res)
			beforeEach(async function() {
					req = {
						path:'/api/test2',
						query:{
							id:1,
							key:'A87DASDW2A',
							method:'test',
							sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
							timestamp:'1550477118',
							v:'1.0'
						}
					}
					await filter(req,_res,next)
			});
			it("should get 402.5 error", function() {
				expect(_res.body.response.code).toEqual('402.5')
			});
		});
		//验证id无效错误
		describe("test error 402.1", function() {
			let _res = Object.assign({},res)
			beforeEach(async function() {
				req = {
					path:'/api/test2',
					query:{
						id:999,
						key:'A87DASDW2A',
						method:'test',
						sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
						timestamp:parseInt(new Date().getTime()/1000),
						v:'1.0'
					}
				}
				await filter(req,_res,next)
			});
			it("should get 402.1 error", function() {
				expect(_res.body.response.code).toEqual('402.1')
			});
		});
		//验证AccessKey无效错误
		describe("test error 402.2", function() {
			let _res = Object.assign({},res)
			beforeEach(async function() {
				req = {
					path:'/api/test2',
					query:{
						id:1,
						key:'ABC',
						method:'test',
						sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
						timestamp:parseInt(new Date().getTime()/1000),
						v:'1.0'
					}
				}
				await filter(req,_res,next)
			});
			it("should get 402.2 error", function() {
				expect(_res.body.response.code).toEqual('402.2')
			});
		});
		//验证AccessKey超过有效期
		describe("test error 402.3", function() {
			let _res = Object.assign({},res)
			beforeEach(async function() {
				req = {
						path:'/api/test2',
						query:{
							id:2,
							key:'DDDD',
							method:'test',
							sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
							timestamp:parseInt(new Date().getTime()/1000),
							v:'1.0'
						}
				}
				await filter(req,_res,next)
			});
			it("should get 402.3 error", function() {
				expect(_res.body.response.code).toEqual('402.3')
			});
		});
		//验证没有授权的方法
		describe("test error 402.6", function() {
			let _res = Object.assign({},res)
			beforeEach(async function() {
				req = {
					path:'/api/test5',
					query:{
						id:1,
						key:'A87DASDW2A',
						method:'test',
						sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
						timestamp:parseInt(new Date().getTime()/1000),
						v:'1.0'
					}
				}
				await filter(req,_res,next)
			});
			it("should get 402.6 error", function() {
				expect(_res.body.response.code).toEqual('402.6')
			});
		});
		
		//验证接口永久失效
		describe("test error 401.1", function() {
			let _res = Object.assign({},res);
			beforeEach(async function() {
				req = {
					path:'/api/test2',
					query:{
						id:1,
						key:'A87DASDW2A',
						method:'test',
						sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
						timestamp:parseInt(new Date().getTime()/1000),
						v:'1.0'
					}
				}
				await filter(req,_res,next)
			});
			it("should get 401.1 error", function() {
				expect(_res.body.response.code).toEqual('401.1')
			});
		});
		//验证接口临时关闭
		describe("test error 401.2", function() {
			let _res = Object.assign({},res);
			beforeEach(async function() {
				req = {
					path:'/api/test3',
					query:{
						id:1,
						key:'A87DASDW2A',
						method:'test',
						sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
						timestamp:parseInt(new Date().getTime()/1000),
						v:'1.0'
					}
				}
				await filter(req,_res,next)
			});
			it("should get 401.2 error", function() {
				expect(_res.body.response.code).toEqual('401.2')
			});
		});
		//验证签名
		describe("test error 402.4", function() {
			let _res = Object.assign({},res);
			beforeEach(async function() {
				req = {
					path:'/api/test1',
					query:{
						id:1,
						key:'A87DASDW2A',
						method:'test',
						sign:'zNvtyuzCaJqiHFYSwcUApQuYPNg=',
						timestamp:parseInt(new Date().getTime()/1000),
						v:'1.0'
					}
				}
				await filter(req,_res,next)
			});
			it("should get 402.4 error", function() {
				expect(_res.body.response.code).toEqual('402.4')
			});
		});
		//正常访问
		describe("test no error", function() {
			let result = false;
			let _res = Object.assign({},res)
			beforeEach(async function() {
				let time = parseInt(new Date().getTime()/1000)
				let _req = {
					id:1,
					key:'A87DASDW2A',
					method:'test',
					timestamp:time,
					v:'1.0'
				}
				let sign = toSignStr(_req,'123456');
				req = {
					path:'/api/test1',
					query:Object.assign(_req,{sign:sign})
				}
				result = await filter(req,_res,next)
			});
			it("should get no error", function() {
				//res.body返回空，filter方法返回true
				expect(_res.body).toBe('')
				expect(result).toBe(true)
			});
		});
	})
}
