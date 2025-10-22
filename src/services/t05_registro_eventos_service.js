const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

const getAllT05eventuser = async (ideven) => {
  return await db.T05_regisevent.findAll({ where: { ideven: ideven } });
};

const findT05eventuserById = async (ideven) => {
  console.log("findT05eventuserById ideven :", ideven);
  return await db.T05_regisevent.findOne({
    where: { ideven },
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
  const { ideven } = cleanData;
  if (!ideven) {
    throw new Error("El campo 'id' es obligatorio para actualizar un usuario");
  }

  // Ejecutar actualización
  await db.T05_regisevent.update(cleanData, {
    where: { ideven },
  });

  const updatedUser = await db.T05_regisevent.findByPk(ideven);
  return updatedUser;
};

const saveOrUpdateT05eventuser = async (data) => {
  try {
    const { ideven } = data;

    if (ideven === undefined || ideven === null) {
      throw new Error("El campo 'ideven' es obligatorio para guardar o actualizar el usuario");
    }

    const existingEventuser = await findT05eventuserById(ideven);

    if (existingEventuser) {
      console.log("🟡 Actualizando usuario existente con IDEVEN:", ideven);
      return await updT05eventuser(data);
    } else {
      console.log("🟢 No se encontró usuario con IDEVEN:", ideven, "→ creando nuevo registro");
      return await createT05eventuser(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05eventuser:", error.message);
    throw error;
  }
};

const deleteT05eventuser = async (ideven) => {
  await db.T05_regisevent.destroy({
    where: { ideven },
  });
};

module.exports = {
  getAllT05eventuser,
  findT05eventuserById,
  createT05eventuser,
  updT05eventuser,
  deleteT05eventuser,
  saveOrUpdateT05eventuser,
};
