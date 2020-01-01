/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('standard_api_system', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    system_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'standard_api_system'
  });
};
