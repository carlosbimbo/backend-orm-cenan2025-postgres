/** @format */

const t05regiseventService = require("../services/t05_regisevent_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getT05regisevent = async (req, res) => {
	console.log('HI regisevent ID : ' + req.params.ideven + ' - ideven : ' + req.ideven);
	console.log(req.body);
	/* 	#swagger.tags = ['TMANZANA']
        #swagger.description = 'Endpoint to regisevent a specific' */
        try {
          var etapagesta = await t05regiseventService.getAllt05regisevent(req.params.ideven);
          //let jsonetapagesta = JSON.parse(JSON.stringify(etapagesta));
          //console.log('etapagesta count(*) : ' + jsonetapagesta.length);
          res.json(etapagesta);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: StatusMessage.INVALID_CREDENTIALS });
        }
};


module.exports = { getT05regisevent };
