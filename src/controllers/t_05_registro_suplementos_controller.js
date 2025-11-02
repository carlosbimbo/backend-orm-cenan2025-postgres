/** @format */

const t05suplementService = require("../services/t_05_registro_suplementos_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getT05suplement = async (req, res) => {
	console.log('HI suplement ID : ' + req.params.ideven + ' - ideven : ' + req.ideven);
	console.log(req.body);
	/* 	#swagger.tags = ['TMANZANA']
        #swagger.description = 'Endpoint to suplement a specific' */
        try {
          var etapagesta = await t05suplementService.getAllT05suplement(req.params.ideven);
          //let jsonetapagesta = JSON.parse(JSON.stringify(etapagesta));
          //console.log('etapagesta count(*) : ' + jsonetapagesta.length);
          res.json(etapagesta);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: StatusMessage.INVALID_CREDENTIALS });
        }
};

const createT05suplement = async (req, res) => {
  /* 	#swagger.tags = ['Personal']
     #swagger.description = 'Endpoint to crear Personal by nombre de usuario' */

/* #swagger.security = [{
         "bearerAuth": []
 }] */

 try {
   var createdT05suplement= await t05suplementService.createT05suplement(req.body);
   //res.status(201).json(createdPerson);
   return res
     .status(StatusCodes.OK)
     .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05suplement } });

 } catch (error) {
   console.log(error);
   res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
 }

};

const udpT05suplement = async (req, res) => {
/* 	#swagger.tags = ['Personal']
#swagger.description = 'Endpoint to crear Personal by nombre de usuario' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdT05suplement = await t05suplementService.updT05suplement(req.body);
//res.status(201).json(createdPerson);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdT05suplement } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrUpdateT05suplement = async (req, res) => {
/* 	#swagger.tags = ['Personal']
#swagger.description = 'Endpoint to crear Personal by nombre de usuario' */

/* #swagger.security = [{
  "bearerAuth": []
}] */

try {
var createdSuple = await t05suplementService.saveOrUpdateT05suplement(req.body);
//res.status(201).json(createdPerson);
return res
    .status(StatusCodes.OK)
    .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdSuple } });

} catch (error) {
console.log(error);
res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
}

};

const saveOrupdSupleSync = async (req, res) => {
  /* 	#swagger.tags = ['Personal']
  #swagger.description = 'Endpoint to crear Personal by nombre de usuario' */
  
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  
  try {
  var createdSuple = await t05suplementService.saveOrUpdT05SupleArray(req.body);
  //res.status(201).json(createdPerson);
  return res
      .status(StatusCodes.OK)
      .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { createdSuple } });
  
  } catch (error) {
  console.log(error);
  res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
  
  };

module.exports = { getT05suplement,saveOrUpdateT05suplement,udpT05suplement,createT05suplement,saveOrupdSupleSync };
