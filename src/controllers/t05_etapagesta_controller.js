/** @format */

const t05etapagestaService = require("../services/t05_etapagesta_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getT05etapagesta = async (req, res) => {
	console.log('HI etapagesta ID : ' + req.params.id + ' - userid : ' + req.userid);
	console.log(req.body);
	/* 	#swagger.tags = ['TMANZANA']
        #swagger.description = 'Endpoint to MANZANAS a specific ZONA' */
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


module.exports = { getT05etapagesta };
