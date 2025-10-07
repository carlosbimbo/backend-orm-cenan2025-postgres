const express = require("express");
const router = express.Router();
const tmanzanaService = require("../services/t_manzana_service");
const tcentropobladoService = require("../services/t_centro_poblado_service");


//router.get("/findjoin/:id/:codccpp/:zona_id", async (req, res) => {
  const getcccpmza = async (req, res) => {
    /* 	#swagger.tags = ['T_JOIN_CCCP_MZA']
        #swagger.description = 'Endpoint to MANZANAS a specific Centro Poblado' */
try {
    var mznas = await tmanzanaService.getAllMza(req.params.id,req.params.codccpp,req.params.zona_id);
    var cps = await tcentropobladoService.getAllCentroPoblado(req.params.id);
    let jsonmza = JSON.parse(JSON.stringify(mznas));
    let jsoncccp = JSON.parse(JSON.stringify(cps));
    //console.log('mznas count(*) : ' + jsonmza.length);
    
/*
     //////////
     let obj1;
     let cccp0 = cps.length == 1 ? JSON.stringify(Object.values(cps)[0]) : JSON.stringify(Object.values(cps));
     let T_CENTRO_POBLADO = JSON.parse(cccp0);
   
     obj1 = {
         "CentroPoblado": {
          T_CENTRO_POBLADO
         },
         "_cantidad": jsoncccp.length
     }
  
     //////////

    //////////
    let obj2;
    let mza0 = mznas.length == 1 ? JSON.stringify(Object.values(mznas)[0]) : JSON.stringify(Object.values(mznas));
    let T_MANZANA = JSON.parse(mza0);
    obj2 = {
        "Manzana": {
            T_MANZANA
        },
        "_cantidad": jsonmza.length
    }
    */
    //////////

    let obj3;
    let mza0 = mznas.length == 1 ? JSON.stringify(Object.values(mznas)[0]) : JSON.stringify(Object.values(mznas));
    let cccp0 = cps.length == 1 ? JSON.stringify(Object.values(cps)[0]) : JSON.stringify(Object.values(cps));
    let T_CENTRO_POBLADO = JSON.parse(cccp0);
    let T_MANZANA = JSON.parse(mza0);
    
    obj3 = {
      "CentroPoblado": {
        T_CENTRO_POBLADO,
        "_cantidad": jsoncccp.length
       },       
        "Manzana": {
            T_MANZANA,
            "_cantidad": jsonmza.length  
        },
             
    }


    //////////
    console.log('Token manzanita accesso : ' + req.userId)
    //console.log('Token lamanzana de accesso : ' + req.accessToken)
    //res.json(obj2);
    res.send({"DIVIES2023" : obj3 , "accessToken" : req.accessToken});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: StatusMessage.INVALID_CREDENTIALS });
  }
};

  
//module.exports = router;

module.exports = { getcccpmza };

// route functions