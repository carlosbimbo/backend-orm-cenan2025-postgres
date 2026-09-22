const { Op } = require("sequelize");
const db = require("../config/db");

async function getHemoglobina(userId) {
  const result = await db.T05_etapagesta.findOne({
    where: { id: userId },
    attributes: ["hemoglo"],
  });
  return result ? Number(result.hemoglo) : null;
}

async function getTotalSuplementos(userId, fecha) {
  return await db.T05_suplement.count({
    where: {
      iduser: userId,
      fecha,
    },
  });
}

/*
async function validateAlarm({ alarm, userId, fecha }) {
  const total = await getTotalSuplementos(userId, fecha);
  const hemoglo = await getHemoglobina(userId);
  console.log('hemoglo okas : ',hemoglo);
  // ❌ NO anemia → no alarmas 4 y 5
  if ((alarm.idalar === 4 || alarm.idalar === 5) && hemoglo !== null && hemoglo >= 11) {
    return false;
  }

  // 🔴 alarmas 1 y 2
  if ([1, 2].includes(alarm.idalar)) {
    return total < 1;
  }

  // 🟢 alarma 3
  if (alarm.idalar === 3) {
    return total === 1 || total === 2;
  }

  // 🟡 alarmas 4 y 5
  if ([4, 5].includes(alarm.idalar)) {
    return total < 2;
  }

  return false;
}
*/

async function validateAlarm({ alarm, userId, fecha }) {
  const total = await getTotalSuplementos(userId, fecha);
  const hemoglo = await getHemoglobina(userId);

  if (hemoglo === null) {
    console.log("⛔ Hemoglobina no encontrada", { userId });
    return false;
  }

  const tieneAnemia = hemoglo < 11;
  let valid = false;

  /* ----------------------------------------
     🟢 PERSONA SIN ANEMIA
  ---------------------------------------- */
  if (!tieneAnemia) {
    if ([4, 5].includes(alarm.idalar)) {
      valid = false;
    } 
    else if ([1, 2].includes(alarm.idalar)) {
      valid = total < 1;
    } 
    else if (alarm.idalar === 3) {
      valid = total === 1;
    }
  }

  /* ----------------------------------------
     🔴 PERSONA CON ANEMIA
  ---------------------------------------- */
  if (tieneAnemia) {
    if ([1, 2, 4, 5].includes(alarm.idalar)) {
      valid = total < 2;
    } 
    else if (alarm.idalar === 3) {
      valid = total === 2;
    }
  }

  // 🧪 LOG DE DEPURACIÓN (AQUÍ VA)
  console.log({
    userId,
    hemoglo,
    tieneAnemia,
    totalSuplementosHoy: total,
    idalar: alarm.idalar,
    valid,
    fecha,
  });

  return valid;
}

module.exports = { validateAlarm };
