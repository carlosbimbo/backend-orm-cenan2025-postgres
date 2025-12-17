const cron = require("node-cron");
const { processAlarms } = require("../services/alarm.service");

console.log("⏱ Alarm Cron inicializado");

cron.schedule(
  "* * * * *",
  async () => {
    try {
      console.log("⏱ CRON ejecutado:", new Date().toISOString());
      await processAlarms("CRON");
    } catch (error) {
      console.error("❌ Error en Alarm Cron:", error);
    }
  },
  {
    timezone: "America/Lima",
  }
);
