const express = require("express");
const router = express.Router();
const tmanzanaService = require("../services/t_manzana_service");
const tcpv0301_detService = require("../services/t_05_dig_cpv0301_det_service");

router.get("/findjoinregis301/:id/:codccpp/:zona_id/:manzana_id", async (req, res) => {
  try {
    var mznas = await tmanzanaService.getAllMza(req.params.id,req.params.codccpp,req.params.zona_id);
    var regisdet = await tcpv0301_detService.getLevelMzaCpv0301det(req.params.id,req.params.codccpp,req.params.zona_id,req.params.manzana_id);
    let jsonmza = JSON.parse(JSON.stringify(mznas));
    let jsonregis301det = JSON.parse(JSON.stringify(regisdet));
    //console.log('mznas count(*) : ' + jsonmza.length);
/*
     //////////
     let obj1;
     let regdet301 = regisdet.length == 1 ? JSON.stringify(Object.values(regisdet)[0]) : JSON.stringify(Object.values(regisdet));
     let T_05_DIG_CPV0301_DET = JSON.parse(regdet301);
   
     obj1 = {
         "CentroPoblado": {
          T_05_DIG_CPV0301_DET
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
    let regdet301 = regisdet.length == 1 ? JSON.stringify(Object.values(regisdet)[0]) : JSON.stringify(Object.values(regisdet));
    let T_05_DIG_CPV0301_DET = JSON.parse(regdet301);
    let T_MANZANA = JSON.parse(mza0);
    
    obj3 = {
     "Manzana": {
            T_MANZANA,
            "_cantidad": jsonmza.length  
        },
      "CP301Det": {
        T_05_DIG_CPV0301_DET,
        "_cantidad": jsonregis301det.length
       },            
             
    }

   //
   /*
   const isObjectEmpty = (objectName) => {
    for (let prop in objectName) {
      console.log('Mira forcito : ' + prop); 
      if (objectName.hasOwnProperty(prop)) {
        console.log('Mira obj : ' + prop); 
        return false;
      }
    }
    return true;
  };
  */

  function removeBlankAttributes(obj) {
    const result = {};
    for (const key in obj) {
      /*console.log('Mira unoo : ' + obj); 
      console.log('Mira dos : ' + key); 
      console.log('Mira tresss : ' + obj[key]._cantidad); */
        //if (obj[key] !== null && obj[key] !== undefined) {
          if (obj[key]._cantidad > 0) {
            result[key] = obj[key];
        }
    }
    return result;
}
 
console.log(removeBlankAttributes(obj3)); 

obj4 = removeBlankAttributes(obj3);

  //console.log(isObjectEmpty(obj3)); 
   //

    //////////

    //res.json(obj2);
    res.send({"DIVIES2023" : obj4 , "accessToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJub21icmUiOiJDYXJsb3MgYmFycmllbnRvcyIsImVtYWlsIjoiY2FybG9zYmFyczhAZ21haWwuY29tIn0sImlhdCI6MTY5NTIyOTgxOX0.cjj2TXQKRk19oQ5LeqF7IMKy7GIuvidXabkQ-foKyzk"});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});


module.exports = router;

// route functions