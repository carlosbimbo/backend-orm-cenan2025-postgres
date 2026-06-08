/** @format */
const { Sequelize } = require("sequelize");

const userModel = require("../models/user.model");
const t05_etapagestaModel = require("../models/t_05_etapa_gestacional_model");
const t05_regiseventModel = require("../models/t05_registro_eventos_model");
const t05_suplementModel = require("../models/t_05_registro_suplementos_model");
const t05_agendagestaModel = require("../models/t_05_agenda_gestacional_model");
const t05_diasgestaModel = require("../models/t_05_dias_gestacion_model");
const alarmExecutionModel = require("../models/alarm_execution.model");
const t05_regishemogloModel = require("../models/t_05_registro_hemoglobina_model");

require("dotenv").config();

const URI = `postgres://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.SQL_PORT}/${process.env.DB}`;

const sequelize = new Sequelize(URI, {
  dialect: process.env.DIALECT || "postgres",
  timezone: 'America/Lima', 
  logging: false, 
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
  },
});

const db = {};

db.User = userModel(sequelize);
db.T05_etapagesta = t05_etapagestaModel(sequelize);
db.T05_regisevent = t05_regiseventModel(sequelize);
db.T05_regishemoglo = t05_regishemogloModel(sequelize);
db.T05_suplement = t05_suplementModel(sequelize);
db.T05_agenda_gestacional = t05_agendagestaModel(sequelize);
db.T05_dias_gestacion = t05_diasgestaModel(sequelize);
db.AlarmExecution = alarmExecutionModel(sequelize);

db.User.hasMany(db.T05_etapagesta, { foreignKey: "id", as: "etapasGestacionales" });
db.User.hasMany(db.T05_regisevent, { foreignKey: "iduser", as: "registroEventos" });
db.User.hasMany(db.T05_suplement, { foreignKey: "iduser", as: "registroSuplementos" });
db.User.hasMany(db.T05_agenda_gestacional, { foreignKey: "id", as: "agendaGestacional" });
db.User.hasMany(db.T05_dias_gestacion, { foreignKey: "iduser", as: "diasGestacion" });
db.User.hasMany(db.T05_regishemoglo, { foreignKey: "iduser", as: "registroHemoglo" });

db.User.hasMany(db.AlarmExecution, {
  foreignKey: "user_id",
  as: "alarmExecutions",
});


db.T05_etapagesta.belongsTo(db.User, { foreignKey: "id", as: "usuario" });
db.T05_regisevent.belongsTo(db.User, { foreignKey: "iduser", as: "usuario" });
db.T05_suplement.belongsTo(db.User, { foreignKey: "iduser", as: "usuario" });
db.T05_agenda_gestacional.belongsTo(db.User, { foreignKey: "id", as: "usuario" });
db.T05_dias_gestacion.belongsTo(db.User, { foreignKey: "iduser", as: "usuario" });
db.T05_regishemoglo.belongsTo(db.User, { foreignKey: "iduser", as: "usuario" });

db.AlarmExecution.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "usuario",
});

sequelize
  .sync({ alter: false })
  .then(() => console.log("✅ Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("❌ Error al sincronizar modelos:", err));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
