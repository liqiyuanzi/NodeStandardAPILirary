import sequelize from './database'
import {
    SQL_TYPE
} from './constant'
export async function query(sql) {
    let data = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    });
    return data
}
export async function remove() {}
export async function update() {}
export async function add(sql) {
    await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT
    });
}