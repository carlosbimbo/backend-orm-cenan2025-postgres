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
const t05supleController = require("../controllers/t_05_registro_suplementos_controller");

const router = express.Router();


router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/findidzona/:id/:codccpp/:zona_id", authMiddleware.verifyToken, tmzaController.getmza);
router.post("/newper", authMiddleware.verifyToken, personController.createPersonal);
router.get("/cccpmza/findjoin/:id/:codccpp/:zona_id", authMiddleware.verifyToken, tjoincccpmzaController.getcccpmza);

router.get("/findetapagesta/:id", authMiddleware.verifyToken, t05etapagestaController.getT05etapagesta);
router.get("/findregisevent/:id", authMiddleware.verifyToken, t05regiseventController.getT05regisevent);

/*for user appcenan*/
router.post("/newuserapp", authMiddleware.verifyToken, authController.createUserapp);
router.post("/updateuserapp", authMiddleware.verifyToken, authController.udpUserapp);
router.post("/saveuserapp", authMiddleware.verifyToken, authController.saveOrupdUserapp);
router.get("/getalldatauser", authMiddleware.verifyToken, authController.getUserFullData);
/*fin for user appcenan*/

/*for user etapagesta*/
router.post("/newetapagesta", authMiddleware.verifyToken, t05etapagestaController.createT05etapagesta);
router.post("/updetapagesta", authMiddleware.verifyToken, t05etapagestaController.udpT05etapagesta);
router.post("/savetapagesta", authMiddleware.verifyToken, t05etapagestaController.saveOrupdT05etapagesta);
/*fin for user etapagesta*/

/*for user event*/
router.post("/neweventuser", authMiddleware.verifyToken, t05regiseventController.createT05regisevent);
router.post("/updeventuser", authMiddleware.verifyToken, t05regiseventController.udpT05regisevent);
router.post("/saveventuser", authMiddleware.verifyToken, t05regiseventController.saveOrUpdateT05event);
/*fin for user event*/

/*for user suplement*/
router.post("/newsuple", authMiddleware.verifyToken, t05supleController.createT05suplement);
router.post("/updsuple", authMiddleware.verifyToken, t05supleController.udpT05suplement);
router.post("/savesuple", authMiddleware.verifyToken, t05supleController.saveOrUpdateT05suplement);
/*fin for user suplement*/


router.get("/profile", authMiddleware.verifyToken, (req, res) => {
  	/*#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to see profile a specific user later signin' */
  // This route is protected and can only be accessed by authenticated users
  res.json({ message: "Profile accessed successfully", userid: req.userid });
  //res.json({ message:"Profile accessed successfully dnce", personId: req.Id });

});

module.exports = router;
