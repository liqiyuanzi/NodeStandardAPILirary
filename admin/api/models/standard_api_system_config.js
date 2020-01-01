/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('standard_api_system_config', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    system_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'standard_api_system',
        key: 'id'
      }
    },
    access_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    access_secret: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    expired_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'standard_api_system_config'
  });
};
