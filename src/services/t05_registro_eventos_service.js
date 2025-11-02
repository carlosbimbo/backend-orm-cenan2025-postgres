const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

const getAllT05eventuser = async (iduser) => {
  return await db.T05_regisevent.findAll({ where: { iduser } });
};

const findT05eventuserById = async (ideven, iduser) => {
  console.log("findT05eventuserById => ideven:", ideven, "iduser:", iduser);
  return await db.T05_regisevent.findOne({
    where: { ideven, iduser },
  });
};

// add T05eventuser
const createT05eventuser = async (data) => {
  const cleanData = sanitizeEmptyValues(data);

  const newEventuser = await db.T05_regisevent.create(cleanData);
  return newEventuser;
};

const updT05eventuser = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const { ideven, iduser } = cleanData;
  if (!ideven || !iduser) {
    throw new Error("Los campos 'ideven' e 'iduser' son obligatorios para actualizar un evento");
  }

  await db.T05_regisevent.update(cleanData, {
    where: { ideven, iduser },
  });

  const updatedEvent = await db.T05_regisevent.findOne({ where: { ideven, iduser } });
  return updatedEvent;
};

const saveOrUpdateT05eventuser = async (data) => {
  try {
    const { ideven, iduser } = data;

    if (ideven == null || iduser == null) {
      throw new Error("Los campos 'ideven' e 'iduser' son obligatorios para guardar o actualizar");
    }

    const existingEvent = await findT05eventuserById(ideven, iduser);

    if (existingEvent) {
      console.log("🟡 Actualizando evento existente:", ideven, iduser);
      return await updT05eventuser(data);
    } else {
      console.log("🟢 No se encontró evento:", ideven, iduser, "→ creando nuevo registro");
      return await createT05eventuser(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05eventuser:", error.message);
    throw error;
  }
};

const deleteT05eventuser = async (ideven, iduser) => {
  await db.T05_regisevent.destroy({
    where: { ideven, iduser },
  });
};

const saveOrUpdEventuserArray = async (dataArray) => {
  try {
    if (!Array.isArray(dataArray)) {
      throw new Error("El parámetro recibido no es un array de registros");
    }

    const results = [];

    for (const data of dataArray) {
      try {
        const { ideven, iduser } = data;

        if (ideven == null || iduser == null) {
          throw new Error("Los campos 'ideven' e 'iduser' son obligatorios para guardar o actualizar");
        }

        const existingEvent = await findT05eventuserById(ideven, iduser);

        if (existingEvent) {
          console.log(`🟡 Actualizando registro existente ideven=${ideven}, iduser=${iduser}`);
          const updated = await updT05eventuser(data);
          results.push({ ideven, iduser, action: "updated", data: updated });
        } else {
          console.log(`🟢 Creando nuevo registro ideven=${ideven}, iduser=${iduser}`);
          const created = await createT05eventuser(data);
          results.push({ ideven, iduser, action: "created", data: created });
        }
      } catch (innerError) {
        console.error("🔴 Error procesando registro:", innerError.message);
        results.push({ error: innerError.message, data });
      }
    }

    return results;
  } catch (error) {
    console.error("🔥 Error general en saveOrUpdEventuserArray:", error.message);
    throw error;
  }
};


module.exports = {
  getAllT05eventuser,
  findT05eventuserById,
  createT05eventuser,
  updT05eventuser,
  deleteT05eventuser,
  saveOrUpdateT05eventuser,
  saveOrUpdEventuserArray
};
