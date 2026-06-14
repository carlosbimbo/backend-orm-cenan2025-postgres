const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    opcgesta: { type: DataTypes.INTEGER, allowNull: true },
    fur: { type: DataTypes.STRING(10), allowNull: true },
    fec_proba_parto: { type: DataTypes.STRING(10), allowNull: true },
    eco_nro_sem_emb: { type: DataTypes.INTEGER, allowNull: true },
    eco_nro_dias_emb: { type: DataTypes.INTEGER, allowNull: true },
    hemoglo: { type: DataTypes.STRING(10), allowNull: true },
    calcu_nrosema: { type: DataTypes.INTEGER, allowNull: true },
    calcu_nrodias: { type: DataTypes.INTEGER, allowNull: true },
    calcu_nrodias_parto: { type: DataTypes.INTEGER, allowNull: true },
    calcu_fecaprox_parto: { type: DataTypes.STRING(10), allowNull: true },
    eco_fechaori: { type: DataTypes.STRING(10), allowNull: true },
  };

  const options = {
    freezeTableName: true, 
    timestamps: false,     
  };

  return sequelize.define("t_05_etapa_gestacional", attributes, options);
}
