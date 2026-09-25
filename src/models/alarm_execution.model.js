const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "alarm_execution",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      idalar: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      respu_expo: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      nro_reinte: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      expopushtoken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      }
    },
    {
      tableName: "alarm_execution",
      schema: "public",
      timestamps: false,
    }
  );
};
