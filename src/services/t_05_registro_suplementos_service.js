const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

const getAllT05suplement = async (iduser) => {
  return await db.T05_suplement.findAll({ where: { iduser } });
};

const findT05suplementById = async (idsuple, iduser) => {
  console.log("findT05suplementById => idsuple:", idsuple, "iduser:", iduser);
  return await db.T05_suplement.findOne({
    where: { idsuple, iduser },
  });
};

const createT05suplement = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const newSuple = await db.T05_suplement.create(cleanData);
  return newSuple;
};

const updT05suplement = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const { idsuple, iduser } = cleanData;

  if (!idsuple || !iduser) {
    throw new Error("Los campos 'idsuple' e 'iduser' son obligatorios para actualizar un suplemento");
  }

  await db.T05_suplement.update(cleanData, {
    where: { idsuple, iduser },
  });

  const updatedSuple = await db.T05_suplement.findOne({ where: { idsuple, iduser } });
  return updatedSuple;
};

const saveOrUpdateT05suplement = async (data) => {
  try {
    const { idsuple, iduser } = data;

    if (idsuple == null || iduser == null) {
      throw new Error("Los campos 'idsuple' e 'iduser' son obligatorios para guardar o actualizar");
    }

    const existingSuple = await findT05suplementById(idsuple, iduser);

    if (existingSuple) {
      console.log("🟡 Actualizando suplemento existente:", idsuple, iduser);
      return await updT05suplement(data);
    } else {
      console.log("🟢 Creando nuevo suplemento:", idsuple, iduser);
      return await createT05suplement(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05suplement:", error.message);
    throw error;
  }
};

const saveOrUpdT05SupleArray = async (dataArray) => {
  try {
    if (!Array.isArray(dataArray)) {
      throw new Error("El parámetro recibido no es un array de registros");
    }

    const results = [];

    for (const data of dataArray) {
      try {
        const { idsuple, iduser } = data;
        console.log("📦 Procesando registro:", data);

        if (idsuple == null || iduser == null) {
          throw new Error("Los campos 'idsuple' e 'iduser' son obligatorios para guardar o actualizar");
        }

        const existingSuple = await findT05suplementById(idsuple, iduser);

        if (existingSuple) {
          console.log(`🟡 Actualizando registro existente idsuple=${idsuple}, iduser=${iduser}`);
          const updated = await updT05suplement(data);
          results.push({ idsuple, iduser, action: "updated", data: updated });
        } else {
          console.log(`🟢 Creando nuevo registro idsuple=${idsuple}, iduser=${iduser}`);
          const created = await createT05suplement(data);
          results.push({ idsuple, iduser, action: "created", data: created });
        }
      } catch (innerError) {
        console.error("🔴 Error procesando registro:", innerError.message);
        results.push({ error: innerError.message, data });
      }
    }

    return results;
  } catch (error) {
    console.error("🔥 Error general en saveOrUpdT05SupleArray:", error.message);
    throw error;
  }
};

const deleteT05suplement = async (idsuple, iduser) => {
  await db.T05_suplement.destroy({
    where: { idsuple, iduser },
  });
};

module.exports = {
  getAllT05suplement,
  findT05suplementById,
  createT05suplement,
  updT05suplement,
  deleteT05suplement,
  saveOrUpdateT05suplement,
  saveOrUpdT05SupleArray
};
