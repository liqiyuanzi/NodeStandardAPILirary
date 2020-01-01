const Sequelize = require("sequelize");
const envConfig = require('../env.cnf');
// 配置项
let sequelize = new Sequelize(
    envConfig.DB.DB_DB, // 数据库名
    envConfig.DB.DB_USER, // 用户名
    envConfig.DB.DB_PWD, // 用户密码
    {
        dialect: envConfig.DB.DB_DIALECT, // 数据库使用mysql
        host: envConfig.DB.DB_HOST, // 数据库服务器ip
        port: envConfig.DB.DB_PORT, // 数据库服务器端口
        timezone: '+08:00',
        pool: {
            max: 5,
            min: 0,
            idle: 10000 //最长空闲时间(毫秒)
        },
        logging: true,
        define: {
            freezeTableName: true,
            timestamps: false,
            underscored: true // 字段以下划线（_）来分割（默认是驼峰命名风格）
        },
        dialectOptions: {
            multipleStatements: true
        }
    }
);
module.exports = sequelize;