const express = require("express");
const router = express.Router();
const tcentropobladoService = require("../services/t_centro_poblado_service");

router.get("/findidcccp/:id", async (req, res) => {
  try {
    var cps = await tcentropobladoService.getAllCentroPoblado(req.params.id);
    res.json(cps);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    var createdtcccp = await tcentropobladoService.createCentroPoblado(req.body);
    res.status(201).json(createdtcccp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/findid/:id/:codccpp", async (req, res) => {
  try {
    //console.log('id : ' + req.params.id + ' - codccpp : ' + req.params.codccpp + ' - zona_id : ' + req.params.zona_id  + ' - manzana_id : ' + req.params.manzana_id)
    var cccp = await tcentropobladoService.findCentroPobladoById(req.params.id,req.params.codccpp);
    if (!cccp) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "CCCP Does not exist" });
    }
    return res.json(cccp);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.put("/:id/:codccpp", async (req, res) => {
  try {
    var exisitingCCCP = await tcentropobladoService.findCentroPobladoById(req.params.id,req.params.codccpp);
    console.log(exisitingCCCP);
    if (!exisitingCCCP) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "CCCP Does not exist" });
    }
    var updatedTCCCP = await tcentropobladoService.updateCentroPoblado(req.body);
    return res.json(updatedTCCCP);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.delete("/:id/:codccpp", async (req, res) => {
  try {
    var exisitingCCCP = await tcentropobladoService.findCentroPobladoById(req.params.id,req.params.codccpp);
    if (!exisitingCCCP) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "CCCP Does not exist" });
    }

    await tcentropobladoService.deleteCentroPoblado(req.params.id,req.params.codccpp);
    return res.json({
      statusCode: 200,
      message: `CCCP with id: ${req.params.id} AND codccpp: ${req.params.codccpp} is deleted successfully`,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});



module.exports = router;

// route functions