const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    idh: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
    },
    iduser: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true, 
    },
    hemo: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },    
    fecha: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    hora: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    lat: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    long: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    altu: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    obs: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  };

  const options = {
    freezeTableName: true,
    timestamps: false,
    tableName: "t_05_registro_hemoglobina",
    schema: "public",
    indexes: [
      {
        unique: true,
        fields: ["idh", "iduser"], 
      },
    ],
  };

  return sequelize.define("t_05_registro_hemoglobina", attributes, options);
}
