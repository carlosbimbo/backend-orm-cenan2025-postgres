// /** @format */

// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const tmzaController = require("../controllers/t_manzana_controller");
const personController = require("../controllers/person.controller");
const tjoincccpmzaController = require("../controllers/t_join_cccp_mza_controller");

const t05etapagestaController = require("../controllers/t05_etapagesta_controller");
const t05regiseventController = require("../controllers/t05_regisevent_controller");

const router = express.Router();


router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/findidzona/:id/:codccpp/:zona_id", authMiddleware.verifyToken, tmzaController.getmza);
router.post("/newper", authMiddleware.verifyToken, personController.createPersonal);
router.get("/cccpmza/findjoin/:id/:codccpp/:zona_id", authMiddleware.verifyToken, tjoincccpmzaController.getcccpmza);

router.get("/findetapagesta/:id", authMiddleware.verifyToken, t05etapagestaController.getT05etapagesta);
router.get("/findregisevent/:id", authMiddleware.verifyToken, t05regiseventController.getT05regisevent);

router.get("/profile", authMiddleware.verifyToken, (req, res) => {
  	/*#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to see profile a specific user later signin' */
  // This route is protected and can only be accessed by authenticated users
  res.json({ message: "Profile accessed successfully", userid: req.userid });
  //res.json({ message:"Profile accessed successfully dnce", personId: req.Id });

});

module.exports = router;
