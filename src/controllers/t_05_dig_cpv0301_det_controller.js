const express = require("express");
const router = express.Router();
const tCpv0301detService = require("../services/t_05_dig_cpv0301_det_service");


router.get("/findmza/:id/:codccpp/:zona_id/:manzana_id", async (req, res) => {
  try {
    var mznaonly = await tCpv0301detService.getLevelMzaCpv0301det(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id);
    //let jsonmza = JSON.parse(JSON.stringify(mznas));
    //console.log('mznas count(*) : ' + jsonmza.length);
    res.json(mznaonly);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/findidzona/:id/:codccpp/:zona_id", async (req, res) => {
  try {
    var mznas = await tCpv0301detService.getAllCpv0301det(req.params.id,req.params.codccpp,req.params.zona_id);
    //let jsonmza = JSON.parse(JSON.stringify(mznas));
    //console.log('mznas count(*) : ' + jsonmza.length);
    res.json(mznas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    var createdtCpv0301det = await tCpv0301detService.createCpv0301det(req.body);
    res.status(201).json(createdtCpv0301det);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/findid/:id/:codccpp/:zona_id/:manzana_id/:frente_id/:dni/:id_reg", async (req, res) => {
  try {
    //console.log('id : ' + req.params.id + ' - codccpp : ' + req.params.codccpp + ' - zona_id : ' + req.params.zona_id  + ' - manzana_id : ' + req.params.manzana_id)
    var mza = await tCpv0301detService.findCpv0301detById(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id,req.params.frente_id,req.params.dni,req.params.id_reg);
    if (!mza) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "CPV0301DET Does not exist" });
    }
    return res.json(mza);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.put("/:id/:codccpp/:zona_id/:manzana_id/:frente_id/:dni/:id_reg", async (req, res) => {
  try {
    var exisitingCpv0301det = await tCpv0301detService.findCpv0301detById(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id,req.params.frente_id,req.params.dni,req.params.id_reg);
    console.log(exisitingCpv0301det);
    if (!exisitingCpv0301det) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "CPV0301DET Does not exist" });
    }
    var updatedTCpv0301det = await tCpv0301detService.updateCpv0301det(req.body);
    return res.json(updatedTCpv0301det);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.delete("/:id/:codccpp/:zona_id/:manzana_id/:frente_id/:dni/:id_reg", async (req, res) => {
  try {
    var exisitingMza = await tCpv0301detService.findCpv0301detById(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id,req.params.frente_id,req.params.dni,req.params.id_reg);
    if (!exisitingMza) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "CPV0301DET Does not exist" });
    }

    await tCpv0301detService.deleteCpv0301det(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id,req.params.frente_id,req.params.dni,req.params.id_reg);
    return res.json({
      statusCode: 200,
      message: `CPV0301DET with id: ${req.params.id} is deleted successfully`,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});



module.exports = router;

// route functions