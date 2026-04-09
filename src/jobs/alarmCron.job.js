// alarmCron.job.js
const cron = require("node-cron");
const { processAlarms } = require("../services/alarm.service");

console.log("⏱ Alarm Cron inicializado");

// Evitar ejecuciones paralelas
let isRunning = false;

cron.schedule(
  "*/2 * * * *", // Cada 2 minutos (recomendado para producción)
  async () => {
    // Evitar ejecución simultánea
    if (isRunning) {
      console.log("⚠️ Cron ya está en ejecución, se omite...");
      return;
    }

    isRunning = true;
    const start = Date.now();

    try {
      console.log("⏱ CRON ejecutado:", new Date().toISOString());

      await processAlarms("CRON");

      const duration = Date.now() - start;
      console.log(`✅ Cron finalizado en ${duration} ms`);
    } catch (error) {
      console.error("❌ Error en Alarm Cron:", error);
    } finally {
      isRunning = false;
    }
  },
  {
    timezone: "America/Lima",
  }
);