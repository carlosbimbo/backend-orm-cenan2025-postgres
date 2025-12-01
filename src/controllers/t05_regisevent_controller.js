/** @format */

const t05regiseventService = require("../services/t05_registro_eventos_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getT05regisevent = async (req, res) => {
	console.log('HI regisevent ID : ' + req.params.ideven + ' - ideven : ' + req.ideven);
	console.log(req.body);
   /* 	#swagger.tags = ['REGISTRO-EVENTOS']
     #swagger.description = 'Endpoint para consultar los registros referentes eventos de las gestantes' */
        try {
          var etapagesta = await t05regiseventService.getAllT05eventuser(req.params.ideven);
          //let jsonetapagesta = JSON.parse(JSON.stringify(etapagesta));
          //console.log('etapagesta count(*) : ' + jsonetapagesta.length);
          res.json(etapagesta);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: StatusMessage.INVALID_CREDENTIALS });
        }
};

const createT05regisevent = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-EVENTOS']
     #swagger.description = 'Endpoint para crear el registro referente evento de la gestante' */

/* #swagger.security = [{
         "bearerAuth": []
 }] */

 try {
   var createdT05regisevent= await t05regiseventService.createT05eventuser(req.body);
   //res.status(201).json(createdPerson);
   return res
     .status(StatusCodes.OK)
     .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05regisevent } });

 } catch (error) {
   console.log(error);
   res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
 }

};

const udpT05regisevent = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-EVENTOS']
     #swagger.description = 'Endpoint para actualizar el registro referente evento de la gestante' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdT05regisevent = await t05regiseventService.updT05eventuser(req.body);
//res.status(201).json(createdPerson);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05regisevent } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrUpdateT05event = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-EVENTOS']
     #swagger.description = 'Endpoint para crear o actualizar el registro referente evento de la gestante' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdPerson = await t05regiseventService.saveOrUpdateT05eventuser(req.body);
//res.status(201).json(createdPerson);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdPerson } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrupdEventUserSync = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-EVENTOS']
     #swagger.description = 'Endpoint para crear o actualizar los registros referentes a eventos de las gestantes' */
  
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  
  try {
  var createdEventUser = await t05regiseventService.saveOrUpdEventuserArray(req.body);
  //res.status(201).json(createdEventUser);
  return res
      .status(StatusCodes.OK)
      .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdEventUser } });
  
  } catch (error) {
  console.log(error);
  res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
  
  };

module.exports = { getT05regisevent,saveOrUpdateT05event,udpT05regisevent,createT05regisevent,saveOrupdEventUserSync };
