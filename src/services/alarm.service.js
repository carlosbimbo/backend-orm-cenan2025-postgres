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

  console.log("==========================================");
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
      // 🛡 Verificamos si ya existe un registro para esta alarma hoy
      const alreadySent = await db.AlarmExecution.findOne({
        where: {
          user_id: user.id,
          idalar: alarm.idalar,
          fecha,
        },
      });

      let currentRetries = 0;

      if (alreadySent) {
        currentRetries = alreadySent.nro_reinte || 0;
        
        // Cortamos si ya alcanzó el máximo de 4 intentos
        if (currentRetries >= 4) {
          continue; 
        }
      }

      // 🩺 Validamos reglas de negocio (Hemoglobina, si ya tomó la dosis, etc.)
      const valid = await validateAlarm({
        alarm,
        userId: user.id,
        fecha,
      });

      // Si no es válido (ej. Ya registró su dosis de hierro), no enviamos y pasamos al siguiente
      if (!valid) {
        if (alreadySent && currentRetries < 4) {
          console.log(`👍 User ${user.id} ya cumplió meta para alarma ${alarm.idalar}. Se frena reintento.`);
        }
        continue;
      }

      currentRetries += 1;
      console.log(`📤 Enviando alarma ${alarm.idalar} a user ${user.id} | Intento: ${currentRetries}/4`);

      // Enviamos el push y capturamos la respuesta de los servidores de Expo
      const expoResponse = await sendPush({
        token: user.expopushtoken,
        alarm,
      });

      // Parsear respuesta para la base de datos limitando a 500 caracteres
      const responseString = expoResponse ? JSON.stringify(expoResponse).substring(0, 500) : null;
      console.log(`📱 Respuesta Expo [User: ${user.id}]:`, responseString);

      // Si ya existía el registro, lo actualizamos sumando el reintento y actualizando la respuesta
      if (alreadySent) {
        await alreadySent.update({
          nro_reinte: currentRetries,
          respu_expo: responseString,
          updated_at: now.toDate(),
          expopushtoken: user.expopushtoken
        });
        console.log(`🔄 AlarmExecution actualizado (Reintento ${currentRetries}) → user ${user.id}`);
      } else {
        // Es la primera vez que se envía hoy, creamos el registro
        await db.AlarmExecution.create({
          user_id: user.id, // Asumiendo que el ID uuid lo genera Sequelize o Postgres por defecto
          idalar: alarm.idalar,
          fecha,
          nro_reinte: currentRetries,
          respu_expo: responseString,
          expopushtoken: user.expopushtoken
        });
        console.log(`✅ AlarmExecution creado (Intento 1) → user ${user.id}`);
      }
    }
  }
  console.log("==========================================");
}

module.exports = { processAlarms };