const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

/**
 * Obtiene todos los registros de días de gestación de un usuario
 */
const getAllT05diasGestacion = async (iduser) => {
  return await db.T05_dias_gestacion.findAll({ where: { iduser } });
};

/**
 * Busca un registro específico por PK compuesta: (id_diasg, iduser)
 */
const findT05diasGestacionById = async (id_diasg, iduser) => {
  console.log("findT05diasGestacionById => id_diasg:", id_diasg, "iduser:", iduser);
  return await db.T05_dias_gestacion.findOne({
    where: { id_diasg, iduser },
  });
};

/**
 * Crea un nuevo registro de día de gestación
 */
const createT05diasGestacion = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const newDiaGesta = await db.T05_dias_gestacion.create(cleanData);
  return newDiaGesta;
};

/**
 * Actualiza un registro existente por PK compuesta
 */
const updT05diasGestacion = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const { id_diasg, iduser } = cleanData;

  if (!id_diasg || !iduser) {
    throw new Error("Los campos 'id_diasg' e 'iduser' son obligatorios para actualizar un registro");
  }

  await db.T05_dias_gestacion.update(cleanData, {
    where: { id_diasg, iduser },
  });

  const updatedDiaGesta = await db.T05_dias_gestacion.findOne({ where: { id_diasg, iduser } });
  return updatedDiaGesta;
};

/**
 * Guarda o actualiza un registro dependiendo si ya existe
 */
const saveOrUpdateT05diasGestacion = async (data) => {
  try {
    const { id_diasg, iduser } = data;

    if (id_diasg == null || iduser == null) {
      throw new Error("Los campos 'id_diasg' e 'iduser' son obligatorios para guardar o actualizar");
    }

    const existingDiaGesta = await findT05diasGestacionById(id_diasg, iduser);

    if (existingDiaGesta) {
      console.log("🟡 Actualizando registro existente:", id_diasg, iduser);
      return await updT05diasGestacion(data);
    } else {
      console.log("🟢 Creando nuevo registro:", id_diasg, iduser);
      return await createT05diasGestacion(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05diasGestacion:", error.message);
    throw error;
  }
};

/**
 * Elimina un registro por PK compuesta
 */
const deleteT05diasGestacion = async (id_diasg, iduser) => {
  await db.T05_dias_gestacion.destroy({
    where: { id_diasg, iduser },
  });
};

/**
 * Guarda o actualiza un array de registros
 */
const saveOrUpdT05diasGestacionArray = async (dataArray) => {
  try {
    if (!Array.isArray(dataArray)) {
      throw new Error("El parámetro recibido no es un array de registros");
    }

    const results = [];

    for (const data of dataArray) {
      try {
        const { id_diasg, iduser } = data;

        if (id_diasg == null || iduser == null) {
          throw new Error("Los campos 'id_diasg' e 'iduser' son obligatorios para guardar o actualizar");
        }

        const existingDiaGesta = await findT05diasGestacionById(id_diasg, iduser);

        if (existingDiaGesta) {
          console.log(`🟡 Actualizando registro existente id_diasg=${id_diasg}, iduser=${iduser}`);
          const updated = await updT05diasGestacion(data);
          results.push({ id_diasg, iduser, action: "updated", data: updated });
        } else {
          console.log(`🟢 Creando nuevo registro id_diasg=${id_diasg}, iduser=${iduser}`);
          const created = await createT05diasGestacion(data);
          results.push({ id_diasg, iduser, action: "created", data: created });
        }
      } catch (innerError) {
        console.error("🔴 Error procesando registro:", innerError.message);
        results.push({ error: innerError.message, data });
      }
    }

    return results;
  } catch (error) {
    console.error("🔥 Error general en saveOrUpdT05diasGestacionArray:", error.message);
    throw error;
  }
};

module.exports = {
  getAllT05diasGestacion,
  findT05diasGestacionById,
  createT05diasGestacion,
  updT05diasGestacion,
  deleteT05diasGestacion,
  saveOrUpdateT05diasGestacion,
  saveOrUpdT05diasGestacionArray,
};
