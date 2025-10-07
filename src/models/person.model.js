const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
    },
    Name: { type: 'character varying(30)', allowNull: true },
    Email: { type: 'character varying(30)', allowNull: true },
    fullname: { type: 'character varying(100)', allowNull: true },
    username: { type: 'character varying(100)', allowNull: true },
    password: { type: 'character varying(10)', allowNull: true },
    created: { type: 'integer', allowNull: true },
    lastupdated: { type: 'integer', allowNull: true },
    loginAttempts: { type: 'integer', allowNull: true },
    lockUntil: { type: 'integer', allowNull: true },
    activated: { type: 'smallint', allowNull: true },
    usertype: { type: 'character varying(100)', allowNull: true },

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,   
    tableName: "person",
    //schema: 'public'
  };
  return sequelize.define("person", attributes, options);
}