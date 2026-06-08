const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

const getAllT05regisHemo = async (iduser) => {
  return await db.T05_regishemoglo.findAll({ where: { iduser } });
};

const findT05regisHemoById = async (idh, iduser) => {
  console.log("findT05regisHemoById => idh:", idh, "iduser:", iduser);
  return await db.T05_regishemoglo.findOne({
    where: { idh, iduser },
  });
};

// add T05regisHemo
const createT05regisHemo = async (data) => {
  const cleanData = sanitizeEmptyValues(data);

  const newregisHemouser = await db.T05_regishemoglo.create(cleanData);
  return newregisHemouser;
};

const updT05regisHemo = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const { idh, iduser } = cleanData;
  if (!idh || !iduser) {
    throw new Error("Los campos 'idh' e 'iduser' son obligatorios para actualizar el Registro Hemoglobina");
  }

  await db.T05_regishemoglo.update(cleanData, {
    where: { idh, iduser },
  });

  const updatedHemo = await db.T05_regishemoglo.findOne({ where: { idh, iduser } });
  return updatedHemo;
};

const saveOrUpdateT05regisHemo = async (data) => {
  try {
    const { idh, iduser } = data;

    if (idh == null || iduser == null) {
      throw new Error("Los campos 'idh' e 'iduser' son obligatorios para guardar o actualizar");
    }

    const existingRegisHemo = await findT05regisHemoById(idh, iduser);

    if (existingRegisHemo) {
      console.log("🟡 Actualizando Registro Hemoglobina existente:", idh, iduser);
      return await updT05regisHemo(data);
    } else {
      console.log("🟢 No se encontró Registro Hemoglobina:", idh, iduser, "→ creando nuevo registro");
      return await createT05regisHemo(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05regisHemo:", error.message);
    throw error;
  }
};

const deleteT05regisHemo = async (idh, iduser) => {
  await db.T05_regishemoglo.destroy({
    where: { idh, iduser },
  });
};

const deleteT05regisHemoByUser = async (iduser) => {
    await db.T05_regishemoglo.destroy({
      where: { iduser },
    });
  };

const saveOrUpdRegisHemoArray = async (dataArray) => {
  try {
    if (!Array.isArray(dataArray)) {
      throw new Error("El parámetro recibido no es un array de registros");
    }

    const results = [];

    for (const data of dataArray) {
      try {
        const { idh, iduser } = data;

        if (idh == null || iduser == null) {
          throw new Error("Los campos 'idh' e 'iduser' son obligatorios para guardar o actualizar");
        }

        const existingEvent = await findT05regisHemoById(idh, iduser);

        if (existingEvent) {
          console.log(`🟡 Actualizando registro existente idh=${idh}, iduser=${iduser}`);
          const updated = await updT05regisHemo(data);
          results.push({ idh, iduser, action: "updated", data: updated });
        } else {
          console.log(`🟢 Creando nuevo registro idh=${idh}, iduser=${iduser}`);
          const created = await createT05regisHemo(data);
          results.push({ idh, iduser, action: "created", data: created });
        }
      } catch (innerError) {
        console.error("🔴 Error procesando registro:", innerError.message);
        results.push({ error: innerError.message, data });
      }
    }

    return results;
  } catch (error) {
    console.error("🔥 Error general en saveOrUpdRegisHemoArray:", error.message);
    throw error;
  }
};


module.exports = {
  getAllT05regisHemo,
  findT05regisHemoById,
  createT05regisHemo,
  updT05regisHemo,
  deleteT05regisHemo,
  saveOrUpdateT05regisHemo,
  saveOrUpdRegisHemoArray,
  deleteT05regisHemoByUser
};
