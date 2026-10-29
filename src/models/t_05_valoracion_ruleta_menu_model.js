const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    iduser: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    idmenu: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    flag_valora: { type: DataTypes.INTEGER, allowNull: true },
    feccre_movil: { type: DataTypes.STRING(10), allowNull: true },
    horacre_movil: { type: DataTypes.STRING(10), allowNull: true },
    fecupd_movil: { type: DataTypes.STRING(10), allowNull: true },
    horaupd_movil: { type: DataTypes.STRING(10), allowNull: true },
    appversion: { type: DataTypes.STRING(10), allowNull: true },
  };

  const options = {
    freezeTableName: true,
    timestamps: false
  };

  return sequelize.define("t_05_valoracion_ruleta_menu", attributes, options);
}
