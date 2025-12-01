/** @format */

const t05diasgestacionService = require("../services/t_05_dias_gestacion_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

/**
 * Obtiene todos los registros de días de gestación de un usuario
 */
const getT05diasGestacion = async (req, res) => {
   /* 	#swagger.tags = ['DIAS-GESTACION']
     #swagger.description = 'Endpoint para consultar todos los dias de gestacion de la Gestante' */

  console.log("📘 getT05diasGestacion - iduser:", req.params.iduser);
  try {
    const diasGestacion = await t05diasgestacionService.getAllT05diasGestacion(req.params.iduser);
    res.json(diasGestacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * Crea un nuevo registro de días de gestación
 */
const createT05diasGestacion = async (req, res) => {
   /* 	#swagger.tags = ['DIAS-GESTACION']
     #swagger.description = 'Endpoint para crear los dias de gestacion de la Gestante' */

  /* #swagger.security = [{
         "bearerAuth": []
  }] */
  try {
    const createdT05dias = await t05diasgestacionService.createT05diasGestacion(req.body);
    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { createdT05dias },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * Actualiza un registro existente de días de gestación
 */
const updT05diasGestacion = async (req, res) => {
   /* 	#swagger.tags = ['DIAS-GESTACION']
     #swagger.description = 'Endpoint para actualizar los dias de gestacion de la Gestante' */

  /* #swagger.security = [{
         "bearerAuth": []
  }] */
  try {
    const updatedT05dias = await t05diasgestacionService.updT05diasGestacion(req.body);
    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { updatedT05dias },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * Guarda o actualiza un registro (si existe, lo actualiza; si no, lo crea)
 */
const saveOrUpdateT05diasGestacion = async (req, res) => {
   /* 	#swagger.tags = ['DIAS-GESTACION']
     #swagger.description = 'Endpoint para crear o actualizar los dias de gestacion de la Gestante' */

  /* #swagger.security = [{
         "bearerAuth": []
  }] */
  try {
    const result = await t05diasgestacionService.saveOrUpdateT05diasGestacion(req.body);
    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { result },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * Sincroniza múltiples registros (crear o actualizar en lote)
 */
const saveOrUpdT05diasGestacionSync = async (req, res) => {
   /* 	#swagger.tags = ['DIAS-GESTACION']
     #swagger.description = 'Endpoint para crear o actualizar todos los dias de gestacion de la Gestante' */

  /* #swagger.security = [{
         "bearerAuth": []
  }] */
  try {
    const syncResult = await t05diasgestacionService.saveOrUpdT05diasGestacionArray(req.body);
    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { syncResult },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * Elimina un registro por id_diasg e iduser
 */
const deleteT05diasGestacion = async (req, res) => {
   /* 	#swagger.tags = ['DIAS-GESTACION']
     #swagger.description = 'Endpoint para eliminar un dia de gestacion de la Gestante' */

  /* #swagger.security = [{
         "bearerAuth": []
  }] */
  try {
    const { id_diasg, iduser } = req.params;
    await t05diasgestacionService.deleteT05diasGestacion(id_diasg, iduser);
    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "Registro eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getT05diasGestacion,
  createT05diasGestacion,
  updT05diasGestacion,
  saveOrUpdateT05diasGestacion,
  saveOrUpdT05diasGestacionSync,
  deleteT05diasGestacion,
};
