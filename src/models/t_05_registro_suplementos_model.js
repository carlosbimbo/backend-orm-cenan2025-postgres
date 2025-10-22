const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    idsuple: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true
    },
    iduser: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    fecha: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    tipo_suple: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    foto: { 
      type: DataTypes.STRING(100), 
      allowNull: true 
    },
    nro_sema: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    destinationuri: { 
      type: DataTypes.STRING(200), 
      allowNull: true 
    }
  };

  const options = {
    freezeTableName: true, 
    timestamps: false,     
    schema: "public",     
  };

  return sequelize.define("t_05_registro_suplementos", attributes, options);
}
