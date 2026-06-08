/** @format */

const t05regishemoService = require("../services/t_05_registro_hemoglobina_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getT05regishemoglo = async (req, res) => {
	//console.log('HI regisHemoglobina ID : ' + req.params.iduser + ' - idh : ' + req.idh);
	console.log(req.body);
   /* 	#swagger.tags = ['REGISTRO-HEMOGLOBINA']
     #swagger.description = 'Endpoint para consultar los registros de Hemoglobina de la gestante' */
        try {
          var regihemogesta = await t05regishemoService.getAllT05regisHemo(req.params.iduser);
          //let jsonregihemogesta = JSON.parse(JSON.stringify(regihemogesta));
          //console.log('regihemogesta count(*) : ' + jsonregihemogesta.length);
          res.json(regihemogesta);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: StatusMessage.INVALID_CREDENTIALS });
        }
};

const createT05regishemoglo = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-HEMOGLOBINA']
     #swagger.description = 'Endpoint para crear el registro referente evento de la gestante' */

/* #swagger.security = [{
         "bearerAuth": []
 }] */

 try {
   var createdT05regishemoglo= await t05regishemoService.createT05regisHemo(req.body);
   //res.status(201).json(createdRegisHemo);
   return res
     .status(StatusCodes.OK)
     .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05regishemoglo } });

 } catch (error) {
   console.log(error);
   res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
 }

};

const udpT05regishemoglo = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-HEMOGLOBINA']
     #swagger.description = 'Endpoint para actualizar el registro de hemoglobina de la gestante' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdT05regishemoglo = await t05regishemoService.updT05regisHemo(req.body);
//res.status(201).json(createdRegisHemo);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05regishemoglo } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrUpdateT05regisHemo = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-HEMOGLOBINA']
     #swagger.description = 'Endpoint para crear o actualizar el registro de hemoglobina de la gestante' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdRegisHemo = await t05regishemoService.saveOrUpdateT05regisHemo(req.body);
//res.status(201).json(createdRegisHemo);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdRegisHemo } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrupdRegisHemoSync = async (req, res) => {
   /* 	#swagger.tags = ['REGISTRO-HEMOGLOBINA']
     #swagger.description = 'Endpoint para crear o actualizar los registros referentes al registro de hemoglobina de las gestantes' */
  
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  
  try {
  var createdRegisHemo = await t05regishemoService.saveOrUpdRegisHemoArray(req.body);
  //res.status(201).json(createdRegisHemo);
  return res
      .status(StatusCodes.OK)
      .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdRegisHemo } });
  
  } catch (error) {
  console.log(error);
  res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
  
  };

module.exports = { getT05regishemoglo,saveOrUpdateT05regisHemo,udpT05regishemoglo,createT05regishemoglo,saveOrupdRegisHemoSync };
