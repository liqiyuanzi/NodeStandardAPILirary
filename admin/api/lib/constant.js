//INTERFACE_STABLE 接口方法运行正常 200 
//INTERFACE_WILL_CLOSE 接口运行正常，即将关闭 201.1
//INTERFACE_INVALID 接口/方法永久失效 401.1
//INTERFACE_TEMP_CLOASE 接口/方法临时关闭  401.2
//NO_SUPPORT_METHOD 不支持/未找到指定的方法/Method 401.3
//UNAUTH 身份验证未通过或其他接口参数验证未通过 402
//INVALID_ID 无效的用户Id 402.1
//INVALID_KEY 无效的AccessKey 402.2
//KEY_OVERTIME AccessKey/AccessSecure超过有效期 402.3
//SIGNATURE_INVALID 签名验证失败 402.4
//TIMEOUT 时间误差超限 402.5
//UNAUTH_METHOD 未被授权访问指定的方法，授权验证未通过 402.6
//UNAUTH_INTERFACE 未被授权访问接口，授权验证未通过 402.6.1
//LOSE_PUBLIC_PARAMS 缺少必要的公共参数XXX，YY 402.7.1
//LOSE_PRIVITE_PARAMS 缺少必要的业务参数XXX，YY 402.7.2
//PUBLIC_PARAMS_ERROR 公共参数XXX的格式异常 402.7.3
//PRIVATE_PARAMS_ERROR 业务参数XXX的格式异常 402.7.4
//REQUEST_REFUSED 访问被拒绝 403
//REQUEST_TIMES_EXCEEDING_LIMIT 调用次数超限 403.1
//REQUEST_RATE_EXCEEDING_LIMIT 调用频度超限 403.2
//REQUEST_IP_LIMIT 访问来源IP受限 403.3
//SYSTEM_ERROR 接口内部运行异常 419.99
export const MESSAGE = {
	'INTERFACE_STABLE':{
		code:'200',
		msg:'接口方法运行正常'
	},
	'INTERFACE_WILL_CLOSE':{
		code:'201.1',
		msg:'接口运行正常，即将关闭'
	},
	'INTERFACE_INVALID':{
		code:'401.1',
		msg:'接口/方法永久失效'
	},
	'INTERFACE_TEMP_CLOSE':{
		code:'401.2',
		msg:'接口/方法临时关闭'
	},
	'NO_SUPPORT_METHOD':{
		code:'401.3',
		msg:'不支持/未找到指定的方法/Method'
	},
	'UNAUTH':{
		code:'402',
		msg:'身份验证未通过或其他接口参数验证未通过'
	},
	'INVALID_ID':{
		code:'402.1',
		msg:'无效的用户Id'
	},
	'INVALID_KEY':{
		code:'402.2',
		msg:'无效的AccessKey'
	},
	'KEY_OVERTIME':{
		code:'402.3',
		msg:'AccessKey/AccessSecure超过有效期'
	},
	'SIGNATURE_INVALID':{
		code:'402.4',
		msg:'签名验证失败'
	},
	'TIMEOUT':{
		code:'402.5',
		msg:'时间误差超限'
	},
	'UNAUTH_METHOD':{
		code:'402.6',
		msg:'未被授权访问指定的方法，授权验证未通过'
	},
	'UNAUTH_INTERFACE':{
		code:'402.6.1',
		msg:'未被授权访问接口，授权验证未通过'
	},
	'LOSE_PUBLIC_PARAMS':{
		code:'402.7.1',
		msg:'缺少必要的公共参数@_@'
	},
	'LOSE_PRIVITE_PARAMS':{
		code:'402.7.2',
		msg:'缺少必要的业务参数@_@'
	},
	'PUBLIC_PARAMS_ERROR':{
		code:'402.7.3',
		msg:'公共参数@_@的格式异常'
	},
	'PRIVATE_PARAMS_ERROR':{
		code:'402.7.4',
		msg:'业务参数@_@的格式异常'
	},
	'REQUEST_REFUSED':{
		code:'403',
		msg:'访问被拒绝'
	},
	'REQUEST_TIMES_EXCEEDING_LIMIT':{
		code:'403.1',
		msg:'调用次数超限'
	},
	'REQUEST_RATE_EXCEEDING_LIMIT':{
		code:'403.2',
		msg:'调用频度超限'
	},
	'REQUEST_IP_LIMIT':{
		code:'403.3',
		msg:'访问来源IP受限'
	},
	'SYSTEM_ERROR':{
		code:'419.99',
		msg:'接口内部运行异常'
	}
}
export const CACHE_TYPE = {
	api:'api',
	systemConfig:'systemConfig',
	apiList:'apiList'
}
export const SQL_TYPE = {
	GET_API:`
		SELECT 
		distinct 
		A.system_id as system_id,
		C.path,
		C.status 
		FROM  standard_api_system A 
		left join standard_api_system_api_mapping B 
		on A.id = B.system_id 
		left JOIN standard_api_api C 
		on B.api_id = C.id
		where A.status = 1
		`,
	GET_SYSTEM_CONFIG:`
		SELECT 
		A.system_id as id,
		A.name,
		A.status,
		B.access_secret,
		B.access_key,
		B.expired_time
		from 
		standard_api_system A
		left join standard_api_system_config B
		on A.id = B.system_id
		where A.status = 1
		`,
	GET_API_LIST:`
		SELECT 
		A.id as id,
		A.name,
		A.path,
		A.status
		from 
		standard_api_api A`,
}
export const API_TYPE = {
	STABLE:0,
	INVALID:1,
	TEMP_CLOSE:2
}
