const db = require("../config/db"); // Ajusta según tu configuración
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues"); // Si lo utilizas en tu proyecto

const findValoracionByIds = async (iduser, idmenu) => {
  return await db.T05_valoracionmenu.findOne({
    where: { iduser, idmenu },
  });
};

const countLikesByMenu = async (idmenu) => {
  return await db.T05_valoracionmenu.count({
    where: { 
      idmenu: idmenu,
      flag_valora: 1 // 1 es que le gustó
    }
  });
};

const saveOrUpdateValoracion = async (data) => {
  try {
    // const cleanData = sanitizeEmptyValues(data); // Opcional según tu utilidad
    const cleanData = data; 
    const { iduser, idmenu } = cleanData;

    if (!iduser || !idmenu) {
      throw new Error("Los campos 'iduser' e 'idmenu' son obligatorios");
    }

    const existingValoracion = await findValoracionByIds(iduser, idmenu);

    if (existingValoracion) {
      await db.T05_valoracionmenu.update(cleanData, {
        where: { iduser, idmenu },
      });
    } else {
      await db.T05_valoracionmenu.create(cleanData);
    }

    // Retornar el total de likes actualizado para este menú
    const totalLikes = await countLikesByMenu(idmenu);
    return totalLikes;

  } catch (error) {
    console.error("🔴 Error en saveOrUpdateValoracion:", error.message);
    throw error;
  }
};

module.exports = {
  findValoracionByIds,
  countLikesByMenu,
  saveOrUpdateValoracion
};