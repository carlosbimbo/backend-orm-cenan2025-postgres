// /** @format */

// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const t05etapagestaController = require("../controllers/t05_etapagesta_controller");
const t05regiseventController = require("../controllers/t05_regisevent_controller");
const t05supleController = require("../controllers/t_05_registro_suplementos_controller");
const t05agendaGestaController = require("../controllers/t_05_agenda_gestacional_controller");
const t05diasGestacionController = require("../controllers/t_05_dias_gestacion_controller");

const router = express.Router();


router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.get("/findetapagesta/:id", authMiddleware.verifyToken, t05etapagestaController.getT05etapagesta);
router.get("/findregisevent/:id", authMiddleware.verifyToken, t05regiseventController.getT05regisevent);

/*for user appcenan*/
router.post("/newuserfirstsign", authController.saveOrupdUserapp);
router.post("/newuserapp", authMiddleware.verifyToken, authController.createUserapp);
router.post("/updateuserapp", authMiddleware.verifyToken, authController.udpUserapp);
router.post("/saveuserapp", authMiddleware.verifyToken, authController.saveOrupdUserapp);
router.get("/getalldatauser", authMiddleware.verifyToken, authController.getUserFullData);
router.post("/syncalluser", authMiddleware.verifyToken, authController.saveOrupdUserSync);
/*fin for user appcenan*/

/*for user etapagesta*/
router.post("/newetapagesta", authMiddleware.verifyToken, t05etapagestaController.createT05etapagesta);
router.post("/updetapagesta", authMiddleware.verifyToken, t05etapagestaController.udpT05etapagesta);
router.post("/savetapagesta", authMiddleware.verifyToken, t05etapagestaController.saveOrupdT05etapagesta);
router.post("/saveorudparragesta", authMiddleware.verifyToken, t05etapagestaController.saveOrupdT05etapagestaArray);
/*fin for user etapagesta*/

/*for user event*/
router.post("/neweventuser", authMiddleware.verifyToken, t05regiseventController.createT05regisevent);
router.post("/updeventuser", authMiddleware.verifyToken, t05regiseventController.udpT05regisevent);
router.post("/saveventuser", authMiddleware.verifyToken, t05regiseventController.saveOrUpdateT05event);
router.post("/syncalleventuser", authMiddleware.verifyToken, t05regiseventController.saveOrupdEventUserSync);
/*fin for user event*/

/*for user suplement*/
router.post("/newsuple", authMiddleware.verifyToken, t05supleController.createT05suplement);
router.post("/updsuple", authMiddleware.verifyToken, t05supleController.udpT05suplement);
router.post("/savesuple", authMiddleware.verifyToken, t05supleController.saveOrUpdateT05suplement);
router.post("/syncallsuple", authMiddleware.verifyToken, t05supleController.saveOrupdSupleSync);
/*fin for user suplement*/

/*for user agent gesta*/
router.post("/syncallagendagesta", authMiddleware.verifyToken, t05agendaGestaController.saveOrUpdAgendaGestacionalSync);
/*fin for agent gesta*/

/*for user days gesta*/
router.post("/syncalldaysgesta", authMiddleware.verifyToken, t05diasGestacionController.saveOrUpdT05diasGestacionSync);
/*fin for days gesta*/


router.get("/profile", authMiddleware.verifyToken, (req, res) => {
  	/*#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to see profile a specific user later signin' */
  // This route is protected and can only be accessed by authenticated users
  res.json({ message: "Profile accessed successfully", userid: req.userid });
  //res.json({ message:"Profile accessed successfully dnce", personId: req.Id });

});

module.exports = router;
