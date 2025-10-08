/** @format */

const { Sequelize } = require("sequelize");
const personModel = require("../models/person.model");
const t_manzanaModel = require("../models/t_manzana_model");
const t_centropobladoModel = require("../models/t_centro_poblado_model");
const t_cpv0301detModel = require("../models/t_05_dig_cpv0301_det_model");

const userModel = require("../models/user.model");


require("dotenv").config();

console.log('mira lagus : ' + process.env.HOST);

const URI = `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.SQL_PORT}/${process.env.DB}`;

const sequelize = new Sequelize(URI, {
  dialect: process.env.DIALECT,
  logging: true,
  //operatorAliases : true,
});

/*
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
   host: process.env.HOST,   
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);
*/

const db = {};
db.User = userModel(sequelize);
db.Person = personModel(sequelize);
db.T_manzana = t_manzanaModel(sequelize);
db.T_centro_poblado = t_centropobladoModel(sequelize);
db.T_05_dig_cpv0301_det = t_cpv0301detModel(sequelize);
db.sequelize = sequelize;
// sync all models with database
/*This checks what is the current state of the table in the database (which columns it has, 
  what are their data types, etc),
 and then performs the necessary changes in the table to make it match the model.*/
sequelize.sync({ alter: true });

module.exports = db;
