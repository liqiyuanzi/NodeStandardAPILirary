/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('standard_api_system_api_mapping', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    api_id: {
      type: DataTypes.INTEGER(255),
      allowNull: true,
      references: {
        model: 'standard_api_api',
        key: 'id'
      }
    },
    system_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'standard_api_system',
        key: 'id'
      }
    }
  }, {
    tableName: 'standard_api_system_api_mapping'
  });
};
