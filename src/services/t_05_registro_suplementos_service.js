const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

const getAllT05suplement = async (idsuple) => {
  return await db.T05_suplement.findAll({ where: { idsuple: idsuple } });
};

const findT05suplementById = async (idsuple) => {
  console.log("findT05suplementById idsuple :", idsuple);
  return await db.T05_suplement.findOne({
    where: { idsuple },
  });
};

// add T05suplement
const createT05suplement = async (data) => {
  const cleanData = sanitizeEmptyValues(data);

  const newSuple = await db.T05_suplement.create(cleanData);
  return newSuple;
};

const updT05suplement = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const { idsuple } = cleanData;
  if (!idsuple) {
    throw new Error("El campo 'id' es obligatorio para actualizar un usuario");
  }

  // Ejecutar actualización
  await db.T05_suplement.update(cleanData, {
    where: { idsuple },
  });

  const updatedSuple = await db.T05_suplement.findByPk(idsuple);
  return updatedSuple;
};

const saveOrUpdateT05suplement = async (data) => {
  try {
    const { idsuple } = data;

    if (idsuple === undefined || idsuple === null) {
      throw new Error("El campo 'idsuple' es obligatorio para guardar o actualizar el usuario");
    }

    const existingSuple = await findT05suplementById(idsuple);

    if (existingSuple) {
      console.log("🟡 Actualizando usuario existente con idsuple:", idsuple);
      return await updT05suplement(data);
    } else {
      console.log("🟢 No se encontró usuario con idsuple:", idsuple, "→ creando nuevo registro");
      return await createT05suplement(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05suplement:", error.message);
    throw error;
  }
};

const deleteT05suplement = async (idsuple) => {
  await db.T05_suplement.destroy({
    where: { idsuple },
  });
};

module.exports = {
  getAllT05suplement,
  findT05suplementById,
  createT05suplement,
  updT05suplement,
  deleteT05suplement,
  saveOrUpdateT05suplement,
};
