const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

/**
 * Obtener todos los registros de agenda gestacional de un usuario (id)
 */
const getAllT05AgendaGestacional = async (id) => {
  return await db.T05_agenda_gestacional.findAll({
    where: { id },
  });
};

/**
 * Buscar un registro específico por su PK compuesta (id, nrosem)
 */
const findT05AgendaGestacionalById = async (id, nrosem) => {
  console.log("findT05AgendaGestacionalById => id:", id, "nrosem:", nrosem);
  return await db.T05_agenda_gestacional.findOne({
    where: { id, nrosem },
  });
};

/**
 * Crear un nuevo registro de agenda gestacional
 */
const createT05AgendaGestacional = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const newAgenda = await db.T05_agenda_gestacional.create(cleanData);
  return newAgenda;
};

/**
 * Actualizar un registro existente de agenda gestacional
 */
const updT05AgendaGestacional = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const { id, nrosem } = cleanData;

  if (!id || !nrosem) {
    throw new Error("Los campos 'id' y 'nrosem' son obligatorios para actualizar un registro de agenda gestacional");
  }

  await db.T05_agenda_gestacional.update(cleanData, {
    where: { id, nrosem },
  });

  const updatedAgenda = await db.T05_agenda_gestacional.findOne({ where: { id, nrosem } });
  return updatedAgenda;
};

/**
 * Crear o actualizar un registro según exista o no
 */
const saveOrUpdateT05AgendaGestacional = async (data) => {
  try {
    const { id, nrosem } = data;

    if (id == null || nrosem == null) {
      throw new Error("Los campos 'id' y 'nrosem' son obligatorios para guardar o actualizar");
    }

    const existingAgenda = await findT05AgendaGestacionalById(id, nrosem);

    if (existingAgenda) {
      console.log("🟡 Actualizando registro existente:", id, nrosem);
      return await updT05AgendaGestacional(data);
    } else {
      console.log("🟢 Creando nuevo registro:", id, nrosem);
      return await createT05AgendaGestacional(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05AgendaGestacional:", error.message);
    throw error;
  }
};

/**
 * Guardar o actualizar múltiples registros de agenda gestacional
 */
const saveOrUpdAgendaGestacionalArray = async (dataArray) => {
  try {
    if (!Array.isArray(dataArray)) {
      throw new Error("El parámetro recibido no es un array de registros");
    }

    const results = [];

    for (const data of dataArray) {
      try {
        const { id, nrosem } = data;

        if (id == null || nrosem == null) {
          throw new Error("Los campos 'id' y 'nrosem' son obligatorios para guardar o actualizar");
        }

        const existingAgenda = await findT05AgendaGestacionalById(id, nrosem);

        if (existingAgenda) {
          console.log(`🟡 Actualizando registro existente id=${id}, nrosem=${nrosem}`);
          const updated = await updT05AgendaGestacional(data);
          results.push({ id, nrosem, action: "updated", data: updated });
        } else {
          console.log(`🟢 Creando nuevo registro id=${id}, nrosem=${nrosem}`);
          const created = await createT05AgendaGestacional(data);
          results.push({ id, nrosem, action: "created", data: created });
        }
      } catch (innerError) {
        console.error("🔴 Error procesando registro:", innerError.message);
        results.push({ error: innerError.message, data });
      }
    }

    return results;
  } catch (error) {
    console.error("🔥 Error general en saveOrUpdAgendaGestacionalArray:", error.message);
    throw error;
  }
};

/**
 * Eliminar un registro por su PK compuesta (id, nrosem)
 */
const deleteT05AgendaGestacional = async (id, nrosem) => {
  await db.T05_agenda_gestacional.destroy({
    where: { id, nrosem },
  });
};

module.exports = {
  getAllT05AgendaGestacional,
  findT05AgendaGestacionalById,
  createT05AgendaGestacional,
  updT05AgendaGestacional,
  deleteT05AgendaGestacional,
  saveOrUpdateT05AgendaGestacional,
  saveOrUpdAgendaGestacionalArray,
};
