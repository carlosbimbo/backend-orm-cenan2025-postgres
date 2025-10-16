const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {  
    ideven: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true // porque usa secuencia nextval()
    },
    iduser: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    tipo: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    fecha: { 
      type: DataTypes.STRING(10), 
      allowNull: true 
    },
    hora: { 
      type: DataTypes.STRING(10), 
      allowNull: true 
    },
    descrip: { 
      type: DataTypes.STRING(2000), 
      allowNull: true 
    },
    alarma: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    estado: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
  };

  const options = {
    freezeTableName: true, // usa el nombre exacto de la tabla
    timestamps: false,     // no crea createdAt ni updatedAt
  };

  return sequelize.define("t_05_registro_eventos", attributes, options);
}
