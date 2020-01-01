const router = require('koa-router')()

import * as standardApi from '../controller/StandardApi';
import * as test from '../controller/test';
//api列表
router.post('/public/standardApi/apiList', standardApi.apiList);
//添加api
router.post('/public/standardApi/addApi', standardApi.addApi);
//查询api详情
router.post('/public/standardApi/getApi', standardApi.getApi);
//编辑api信息
router.post('/public/standardApi/editApi', standardApi.editApi);
//system列表
router.post('/public/standardApi/systemList', standardApi.systemList);
//添加system
router.post('/public/standardApi/addSystem', standardApi.addSystem);
//查询system详情
router.post('/public/standardApi/getSystem', standardApi.getSystem);
//编辑system信息
router.post('/public/standardApi/editSystem', standardApi.editSystem);
//systemConfig列表
router.post('/public/standardApi/systemConfigList', standardApi.systemConfigList);
//添加systemConfig
router.post('/public/standardApi/addSystemConfig', standardApi.addSystemConfig);
//查询systemConfig详情
router.post('/public/standardApi/getSystemConfig', standardApi.getSystemConfig);
//编辑systemConfig信息
router.post('/public/standardApi/editSystemConfig', standardApi.editSystemConfig);
//添加api system mapping
router.post('/public/standardApi/addSystemApiMapping', standardApi.addSystemApiMapping);
//查询api system mapping
router.post('/public/standardApi/getSystemApiMapping', standardApi.getSystemApiMapping);
//删除 api system mapping
router.post('/public/standardApi/deleteSystemApiMapping', standardApi.deleteSystemApiMapping);
//删除 api system mapping
router.post('/api/test1', test.tempMethod);
module.exports = router
