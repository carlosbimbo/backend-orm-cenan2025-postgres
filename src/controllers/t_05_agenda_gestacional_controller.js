/** @format */

const t05AgendaGestacionalService = require("../services/t_05_agenda_gestacional_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

/**
 * Obtener todas las semanas registradas para un ID (gestante o usuario)
 */
const getT05AgendaGestacional = async (req, res) => {
  console.log("🟢 getT05AgendaGestacional ID:", req.params.id);

  try {
    const agenda = await t05AgendaGestacionalService.getAllT05AgendaGestacional(req.params.id);
    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: agenda,
    });
  } catch (error) {
    console.error("🔴 Error en getT05AgendaGestacional:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Crear un nuevo registro de agenda gestacional
 */
const createT05AgendaGestacional = async (req, res) => {
  try {
    const createdAgenda = await t05AgendaGestacionalService.createT05AgendaGestacional(req.body);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { createdAgenda },
    });
  } catch (error) {
    console.error("🔴 Error en createT05AgendaGestacional:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Actualizar un registro existente
 */
const updT05AgendaGestacional = async (req, res) => {
  try {
    const updatedAgenda = await t05AgendaGestacionalService.updT05AgendaGestacional(req.body);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { updatedAgenda },
    });
  } catch (error) {
    console.error("🔴 Error en updT05AgendaGestacional:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Crear o actualizar un registro (upsert)
 */
const saveOrUpdateT05AgendaGestacional = async (req, res) => {
  try {
    const savedAgenda = await t05AgendaGestacionalService.saveOrUpdateT05AgendaGestacional(req.body);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { savedAgenda },
    });
  } catch (error) {
    console.error("🔴 Error en saveOrUpdateT05AgendaGestacional:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Sincronizar un arreglo de registros (para sincronización móvil)
 */
const saveOrUpdAgendaGestacionalSync = async (req, res) => {
  try {
    const results = await t05AgendaGestacionalService.saveOrUpdAgendaGestacionalArray(req.body);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { results },
    });
  } catch (error) {
    console.error("🔴 Error en saveOrUpdAgendaGestacionalSync:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Eliminar un registro específico por su PK compuesta (id, nrosem)
 */
const deleteT05AgendaGestacional = async (req, res) => {
  try {
    const { id, nrosem } = req.params;

    await t05AgendaGestacionalService.deleteT05AgendaGestacional(id, nrosem);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: `Registro eliminado correctamente (id=${id}, nrosem=${nrosem})`,
    });
  } catch (error) {
    console.error("🔴 Error en deleteT05AgendaGestacional:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  getT05AgendaGestacional,
  createT05AgendaGestacional,
  updT05AgendaGestacional,
  saveOrUpdateT05AgendaGestacional,
  saveOrUpdAgendaGestacionalSync,
  deleteT05AgendaGestacional,
};
