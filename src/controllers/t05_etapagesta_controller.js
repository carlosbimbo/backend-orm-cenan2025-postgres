/** @format */

const t05etapagestaService = require("../services/t05_etapagesta_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getT05etapagesta = async (req, res) => {
	console.log('HI etapagesta ID : ' + req.params.id + ' - userid : ' + req.userid);
	console.log(req.body);
   /* 	#swagger.tags = ['ETAPA-GESTACIONAL']
     #swagger.description = 'Endpoint para consultar datos todo el periodo gestacional del paciente' */
        try {
          var etapagesta = await t05etapagestaService.getAllT05etapagesta(req.params.id);
          //let jsonetapagesta = JSON.parse(JSON.stringify(etapagesta));
          //console.log('etapagesta count(*) : ' + jsonetapagesta.length);
          res.json(etapagesta);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: StatusMessage.INVALID_CREDENTIALS });
        }
};

const createT05etapagesta = async (req, res) => {
   /* 	#swagger.tags = ['ETAPA-GESTACIONAL']
     #swagger.description = 'Endpoint para crear el registro con los datos referente al periodo gestacional del paciente' */

/* #swagger.security = [{
         "bearerAuth": []
 }] */

 const { username,password,dni,nombape,lati,longi,altura,lati_viv,longi_viv,altura_viv,profileimage } = req.body;
 try {
   var createdT05etapagesta= await t05etapagestaService.createT05etapagesta(req.body);
   //res.status(201).json(createdPerson);
   return res
     .status(StatusCodes.OK)
     .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05etapagesta } });

 } catch (error) {
   console.log(error);
   res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
 }

};

const udpT05etapagesta = async (req, res) => {
   /* 	#swagger.tags = ['ETAPA-GESTACIONAL']
     #swagger.description = 'Endpoint para actualizar el registro referente al periodo gestacional del paciente' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdT05etapagesta = await t05etapagestaService.updT05etapagesta(req.body);
//res.status(201).json(createdPerson);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05etapagesta } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrupdT05etapagesta = async (req, res) => {
   /* 	#swagger.tags = ['ETAPA-GESTACIONAL']
     #swagger.description = 'Endpoint para crear o actualizar el registro referente al periodo gestacional del paciente' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdPerson = await t05etapagestaService.saveOrUpdateT05etapagesta(req.body);
//res.status(201).json(createdPerson);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdPerson } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrupdT05etapagestaArray = async (req, res) => {
   /* 	#swagger.tags = ['ETAPA-GESTACIONAL']
     #swagger.description = 'Endpoint para crear o actualizar los registros referentes al periodo gestacional de los pacientes' */
  
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  
  try {
  var createdGesta = await t05etapagestaService.saveOrUpdateT05etapagestaArray(req.body);
  //res.status(201).json(createdGesta);
  return res
      .status(StatusCodes.OK)
      .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdGesta } });
  
  } catch (error) {
  console.log(error);
  res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
  
  };

module.exports = { getT05etapagesta,saveOrupdT05etapagesta,udpT05etapagesta,createT05etapagesta,saveOrupdT05etapagestaArray };
