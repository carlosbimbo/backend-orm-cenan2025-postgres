const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id_diasg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
    },
    iduser: {
      type: DataTypes.UUID, 
      allowNull: false,
      primaryKey: true, 
    },
    nroseman: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fec_seman: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    fec_diagesta: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  };

  const options = {
    freezeTableName: true, 
    timestamps: false,     
    tableName: "t_05_dias_gestacion", 
    schema: "public",
    indexes: [
      {
        unique: true,
        fields: ["id_diasg", "iduser"], 
      },
    ],
  };

  return sequelize.define("t_05_dias_gestacion", attributes, options);
}
