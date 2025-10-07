/** @format */

const tmanzanaService = require("../services/t_manzana_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getmza = async (req, res) => {
	console.log('HI MZA ID : ' + req.params.id + ' - CCCP : ' + req.params.codccpp + ' - ZONA_ID : ' + req.params.zona_id + ' - userId : ' + req.userId);
	console.log(req.body);
	/* 	#swagger.tags = ['TMANZANA']
        #swagger.description = 'Endpoint to MANZANAS a specific ZONA' */
        try {
          var mznas = await tmanzanaService.getAllMza(req.params.id,req.params.codccpp,req.params.zona_id);
          //let jsonmza = JSON.parse(JSON.stringify(mznas));
          //console.log('mznas count(*) : ' + jsonmza.length);
          res.json(mznas);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: StatusMessage.INVALID_CREDENTIALS });
        }
};

/*
router.get("/findidzona/:id/:codccpp/:zona_id", async (req, res) => {
  try {
    var mznas = await tmanzanaService.getAllMza(req.params.id,req.params.codccpp,req.params.zona_id);
    //let jsonmza = JSON.parse(JSON.stringify(mznas));
    //console.log('mznas count(*) : ' + jsonmza.length);
    res.json(mznas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});
*/
/*
router.post("/", async (req, res) => {
  try {
    var createdtmza = await tmanzanaService.createMza(req.body);
    res.status(201).json(createdtmza);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/findid/:id/:codccpp/:zona_id/:manzana_id", async (req, res) => {
  try {
    //console.log('id : ' + req.params.id + ' - codccpp : ' + req.params.codccpp + ' - zona_id : ' + req.params.zona_id  + ' - manzana_id : ' + req.params.manzana_id)
    var mza = await tmanzanaService.findMzaById(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id);
    if (!mza) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Manzana Does not exist" });
    }
    return res.json(mza);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.put("/:id/:codccpp/:zona_id/:manzana_id", async (req, res) => {
  try {
    var exisitingMza = await tmanzanaService.findMzaById(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id);
    console.log(exisitingMza);
    if (!exisitingMza) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Manzana Does not exist" });
    }
    var updatedTMza = await tmanzanaService.updateMza(req.body);
    return res.json(updatedTMza);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.delete("/:id/:codccpp/:zona_id/:manzana_id", async (req, res) => {
  try {
    var exisitingMza = await tmanzanaService.findMzaById(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id);
    if (!exisitingMza) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Manzana Does not exist" });
    }

    await tmanzanaService.deleteMza(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id);
    return res.json({
      statusCode: 200,
      message: `Manzana with id: ${req.params.id} is deleted successfully`,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});
*/

module.exports = { getmza };

//module.exports = router;

// route functions