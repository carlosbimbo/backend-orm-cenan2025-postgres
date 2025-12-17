const express = require("express");
const router = express.Router();
const alarmController = require("../controllers/alarm.controller");

router.post("/run-alarm-job", alarmController.runAlarmManually);

module.exports = router;
