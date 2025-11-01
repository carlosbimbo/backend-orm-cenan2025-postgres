const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

const getAllT05etapagesta = async (id) => {
  return await db.T05_etapagesta.findAll({ where: { id: id } });
};

const findT05etapagestaById = async (id) => {
  console.log("findT05etapagestaById id :", id);
  return await db.T05_etapagesta.findOne({
    where: { id },
  });
};

// add T05etapagesta
const createT05etapagesta = async (data) => {
  const cleanData = sanitizeEmptyValues(data);

  const newEtapagesta = await db.T05_etapagesta.create(cleanData);
  return newEtapagesta;
};

const updT05etapagesta = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const { id } = cleanData;
  if (!id) {
    throw new Error("El campo 'id' es obligatorio para actualizar un usuario");
  }

  // Ejecutar actualización
  await db.T05_etapagesta.update(cleanData, {
    where: { id },
  });

  const updatedEtapagesta = await db.T05_etapagesta.findByPk(id);
  return updatedEtapagesta;
};

const saveOrUpdateT05etapagesta = async (data) => {
  try {
    const { id } = data;
    console.log(data);
    console.log(id);

    if (id === undefined || id === null) {
      throw new Error("El campo 'id' es obligatorio para guardar o actualizar el usuario");
    }

    const existingEtapagesta = await findT05etapagestaById(id);

    if (existingEtapagesta) {
      console.log("🟡 Actualizando usuario existente con ID:", id);
      return await updT05etapagesta(data);
    } else {
      console.log("🟢 No se encontró usuario con ID:", id, "→ creando nuevo registro");
      return await createT05etapagesta(data);
    }
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05etapagesta:", error.message);
    throw error;
  }
};

const deleteT05etapagesta = async (id) => {
  await db.T05_etapagesta.destroy({
    where: { id },
  });
};

const saveOrUpdateT05etapagestaArray = async (dataArray) => {
  try {    
    if (!Array.isArray(dataArray)) {
      throw new Error("El parámetro recibido no es un array de registros");
    }
    const results = [];    
    for (const data of dataArray) {
      try {
        const { id } = data;
        console.log("📦 Procesando registro:", data);
        console.log("🔑 ID:", id);

        if (id === undefined || id === null) {
          throw new Error("El campo 'id' es obligatorio para guardar o actualizar");
        }

        const existingEtapagesta = await findT05etapagestaById(id);

        if (existingEtapagesta) {
          console.log("🟡 Actualizando registro existente con ID:", id);
          const updated = await updT05etapagesta(data);
          results.push({ id, action: "updated", data: updated });
        } else {
          console.log("🟢 Creando nuevo registro con ID:", id);
          const created = await createT05etapagesta(data);
          results.push({ id, action: "created", data: created });
        }
      } catch (innerError) {
        // Si un registro falla, lo capturamos pero seguimos con los demás
        console.error("🔴 Error procesando registro:", innerError.message);
        results.push({ error: innerError.message, data });
      }
    }

    // Devolvemos todos los resultados (éxitos y errores)
    return results;
  } catch (error) {
    console.error("🔥 Error general en saveOrUpdateT05etapagesta:", error.message);
    throw error;
  }
};


module.exports = {
  getAllT05etapagesta,
  findT05etapagestaById,
  createT05etapagesta,
  updT05etapagesta,
  deleteT05etapagesta,
  saveOrUpdateT05etapagesta,
  saveOrUpdateT05etapagestaArray
};
