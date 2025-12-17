const { processAlarms } = require("../services/alarm.service");

const runAlarmManually = async (req, res) => {
  try {
    await processAlarms();
    return res.status(200).json({
      status: "OK",
      message: "Alarmas procesadas correctamente",
    });
  } catch (error) {
    console.error("❌ Error alarm controller:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Error procesando alarmas",
    });
  }
};

module.exports = { runAlarmManually };
