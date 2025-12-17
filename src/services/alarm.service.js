const moment = require("moment-timezone");
const { Op } = require("sequelize");
const db = require("../config/db");
const alarmTimes = require("../config/alarmTimes");
const { validateAlarm } = require("./alarmValidator.service");
const { sendPush } = require("./pushNotification.service");

function alarmTimePassed(alarm, now) {
  const alarmMoment = now.clone()
    .hour(alarm.hour)
    .minute(alarm.minute)
    .second(0);

  return now.isSameOrAfter(alarmMoment);
}

async function processAlarms() {
  const now = moment().tz("America/Lima");
  const fecha = now.format("YYYY-MM-DD");

  console.log("⏱ CRON ejecutado:", now.format());

  const users = await db.User.findAll({
    where: {
      expopushtoken: { [Op.ne]: null },
    },
    raw: true,
  });

  console.log(`👥 Usuarios con token: ${users.length}`);

  for (const alarm of alarmTimes) {

    // ⛔ AÚN NO LLEGA LA HORA DE ESTA ALARMA
    if (!alarmTimePassed(alarm, now)) continue;

    for (const user of users) {

      // 🛡 anti-duplicado
      const alreadySent = await db.AlarmExecution.findOne({
        where: {
          user_id: user.id,
          idalar: alarm.idalar,
          fecha,
        },
      });

      if (alreadySent) continue;

      const valid = await validateAlarm({
        alarm,
        userId: user.id,
        fecha,
      });

      if (!valid) continue;

      console.log(`📤 Enviando alarma ${alarm.idalar} a user ${user.id}`);

      await sendPush({
        token: user.expopushtoken,
        alarm,
      });

      await db.AlarmExecution.create({
        user_id: user.id,
        idalar: alarm.idalar,
        fecha,
      });

      console.log(`✅ AlarmExecution guardado → user ${user.id}, alarma ${alarm.idalar}`);
    }
  }
}

module.exports = { processAlarms };
