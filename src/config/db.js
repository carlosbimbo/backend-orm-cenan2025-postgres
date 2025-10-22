/** @format */
const { Sequelize } = require("sequelize");

const personModel = require("../models/person.model");
const t_manzanaModel = require("../models/t_manzana_model");
const t_centropobladoModel = require("../models/t_centro_poblado_model");
const t_cpv0301detModel = require("../models/t_05_dig_cpv0301_det_model");

const userModel = require("../models/user.model");
const t05_etapagestaModel = require("../models/t_05_etapa_gestacional_model");
const t05_regiseventModel = require("../models/t05_registro_eventos_model");
const t05_suplementModel = require("../models/t_05_registro_suplementos_model");

require("dotenv").config();

const URI = `postgres://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.SQL_PORT}/${process.env.DB}`;

const sequelize = new Sequelize(URI, {
  dialect: process.env.DIALECT || "postgres",
  logging: false, 
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
  },
});

const db = {};

db.User = userModel(sequelize);
db.T05_etapagesta = t05_etapagestaModel(sequelize);
db.T05_regisevent = t05_regiseventModel(sequelize);
db.T05_suplement = t05_suplementModel(sequelize);

db.Person = personModel(sequelize);
db.T_manzana = t_manzanaModel(sequelize);
db.T_centro_poblado = t_centropobladoModel(sequelize);
db.T_05_dig_cpv0301_det = t_cpv0301detModel(sequelize);

// 🔹 Relaciones
db.User.hasMany(db.T05_etapagesta, { foreignKey: "id", as: "etapasGestacionales" });
db.User.hasMany(db.T05_regisevent, { foreignKey: "iduser", as: "registroEventos" });
db.User.hasMany(db.T05_suplement, { foreignKey: "iduser", as: "registroSuplementos" });

// 🔹 Relaciones inversas
db.T05_etapagesta.belongsTo(db.User, { foreignKey: "id", as: "usuario" });
db.T05_regisevent.belongsTo(db.User, { foreignKey: "iduser", as: "usuario" });
db.T05_suplement.belongsTo(db.User, { foreignKey: "iduser", as: "usuario" });


sequelize
  .sync({ alter: false })
  .then(() => console.log("✅ Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("❌ Error al sincronizar modelos:", err));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
