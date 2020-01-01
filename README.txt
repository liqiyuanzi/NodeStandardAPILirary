使用前需要安装以下包
npm i 
babel-core babel-polyfill crypto,sequelize iconv-lite lodash node-cache redis
使用流程：
	1.将lib目录复制到项目根目录（与api.js同级）
	2.api.js添加如下引用
	import filterAction from './lib/filter'
	import {init} from './lib/refresh'//初始化缓存
	
	koa:
	var app = Koa();
	//添加过滤器中间件
	app.use(function (ctx, next) {
		let r = filterAction(ctx,next);
		if(r)
			return next()
		else
			return
	})
	//初始化缓存
	(function() {
		init();
	})()
	/*************************************/
	express:
	var app = express();
	//添加过滤器中间件
	app.use(async function (req,res, next) {
	  let r = await filterAction(req,next);
	  if(r)
		return next()
	  else
		return
	})
	//初始化缓存
	(function() {
		init();
	})()
	/*************************************/
	
	3.lib 下的config.js文件
	修改配置
	多进程开启redis true 否则 false，framework根据当前是koa或express进行修改
	例如：
	module.exports = {
		framework : 'koa',
		redis:true
	}
单元测试流程
	npm i jasmine -g 
	命令行执行 jasmine --config=test/jasmine.json
	

1.id显示
2.永久失效无法恢复
3.说明文档加入
4.前端页面接入方式
5.setRes加入说明
6.多进程redis配置，数据库配置
7.签名请求方方法单独说明