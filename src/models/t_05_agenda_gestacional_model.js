const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,       
      allowNull: false,
      primaryKey: true,          
    },
    nrosem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,          
    },
    fec_marker: {
      type: DataTypes.STRING(10), 
      allowNull: true,
    },
  };

  const options = {
    freezeTableName: true,              
    timestamps: false,                  
    tableName: "t_05_agenda_gestacional",
    schema: "public",
    indexes: [
      {
        unique: true,
        fields: ["id", "nrosem"],       
      },
    ],
  };

  return sequelize.define("t_05_agenda_gestacional", attributes, options);
}
