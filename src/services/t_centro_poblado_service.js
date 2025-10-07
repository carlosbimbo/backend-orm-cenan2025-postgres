const db = require("../config/db");

const getAllCentroPoblado = async (id) => {
  return await db.T_centro_poblado.findAll({ where: { ID: id,
 }});
};

const findCentroPobladoById = async (id,codccpp) => {
  //console.log('findMzaById id : ' + id + ' - codccpp : ' + codccpp + ' - zona_id : ' + zona_id  + ' - manzana_id : ' + manzana_id)
  return await db.T_centro_poblado.findOne({
    where: {
      ID: id,
      CODCCPP: codccpp,    
    }
  });
};

const createCentroPoblado = async ({ ID, CODCCPP, TIPO, NOMCCPP, NOMCCPP_ANTERIOR, TOTAL_VIVIENDAS, TOTAL_VIVIENDAS_MARCO, CONGLOMERADO, CATEGORIA, CATEGORIA_O, ESTADO, ESTADO_ANT, LONGX_CARTO, LATY_CARTO, ID_AER_INI, AER_INI, AER_FIN, INTOCABLE, DNI_INI, DNI_FIN, FECHA_EMP, OBSERVACION, USUCRE, FECCRE, USUREG, FECREG, FECENV }) => {
  const newCentroPoblado = await db.T_centro_poblado.create({ ID, CODCCPP, TIPO, NOMCCPP, NOMCCPP_ANTERIOR, TOTAL_VIVIENDAS, TOTAL_VIVIENDAS_MARCO, CONGLOMERADO, CATEGORIA, CATEGORIA_O, ESTADO, ESTADO_ANT, LONGX_CARTO, LATY_CARTO, ID_AER_INI, AER_INI, AER_FIN, INTOCABLE, DNI_INI, DNI_FIN, FECHA_EMP, OBSERVACION, USUCRE, FECCRE, USUREG, FECREG, FECENV });
  return newCentroPoblado;
};

const updateCentroPoblado = async ({ ID, CODCCPP, TIPO, NOMCCPP, NOMCCPP_ANTERIOR, TOTAL_VIVIENDAS, TOTAL_VIVIENDAS_MARCO, CONGLOMERADO, CATEGORIA, CATEGORIA_O, ESTADO, ESTADO_ANT, LONGX_CARTO, LATY_CARTO, ID_AER_INI, AER_INI, AER_FIN, INTOCABLE, DNI_INI, DNI_FIN, FECHA_EMP, OBSERVACION, USUCRE, FECCRE, USUREG, FECREG, FECENV }) => {
  await db.T_centro_poblado.update(
    { ID, CODCCPP, TIPO, NOMCCPP, NOMCCPP_ANTERIOR, TOTAL_VIVIENDAS, TOTAL_VIVIENDAS_MARCO, CONGLOMERADO, CATEGORIA, CATEGORIA_O, ESTADO, ESTADO_ANT, LONGX_CARTO, LATY_CARTO, ID_AER_INI, AER_INI, AER_FIN, INTOCABLE, DNI_INI, DNI_FIN, FECHA_EMP, OBSERVACION, USUCRE, FECCRE, USUREG, FECREG, FECENV },
    {
      where: {
        ID: ID,
        CODCCPP: CODCCPP,      
      },
    }
  );
  return { ID, CODCCPP, TIPO, NOMCCPP, NOMCCPP_ANTERIOR, TOTAL_VIVIENDAS, TOTAL_VIVIENDAS_MARCO, CONGLOMERADO, CATEGORIA, CATEGORIA_O, ESTADO, ESTADO_ANT, LONGX_CARTO, LATY_CARTO, ID_AER_INI, AER_INI, AER_FIN, INTOCABLE, DNI_INI, DNI_FIN, FECHA_EMP, OBSERVACION, USUCRE, FECCRE, USUREG, FECREG, FECENV };
};

const deleteCentroPoblado = async (Id, Codccpp) => {
  await db.T_centro_poblado.destroy({
    where: { ID: Id , CODCCPP: Codccpp },
  });
};


module.exports = {
    getAllCentroPoblado,
    findCentroPobladoById,
    createCentroPoblado,
    updateCentroPoblado,
    deleteCentroPoblado,  
};
