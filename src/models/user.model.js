const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,      
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dni: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    nombape: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    lati: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longi: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
      },
    },
    altura: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    lati_viv: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    longi_viv: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    altura_viv: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  };

  const options = {
    freezeTableName: true, 
    timestamps: false,    
    tableName: "users",
    schema: "public",
  };

  return sequelize.define("users", attributes, options);
}
