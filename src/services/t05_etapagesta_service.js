const db = require("../config/db");

const getAllT05etapagesta = async (id) => {
  return await db.T05_etapagesta.findAll({ where: { id: id }});
};

const findT05etapagestaById = async (id) => {
  console.log('findT05etapagestaById id : ' + id)
  return await db.T05_etapagesta.findOne({
    where: {
      id: id
    }
  });
};

const createT05etapagesta = async ({ id,opcgesta,fur,fec_proba_parto,eco_nro_sem_emb,eco_nro_dias_emb,hemoglo,calcu_nrosema,calcu_nrodias,calcu_nrodias_parto,calcu_fecaprox_parto }) => {
  const newT05etapagesta = await db.T05_etapagesta.create({ id,opcgesta,fur,fec_proba_parto,eco_nro_sem_emb,eco_nro_dias_emb,hemoglo,calcu_nrosema,calcu_nrodias,calcu_nrodias_parto,calcu_fecaprox_parto });
  return newT05etapagesta;
};

const updateT05etapagesta = async ({ id,opcgesta,fur,fec_proba_parto,eco_nro_sem_emb,eco_nro_dias_emb,hemoglo,calcu_nrosema,calcu_nrodias,calcu_nrodias_parto,calcu_fecaprox_parto }) => {
  await db.T05_etapagesta.update(
    { id,opcgesta,fur,fec_proba_parto,eco_nro_sem_emb,eco_nro_dias_emb,hemoglo,calcu_nrosema,calcu_nrodias,calcu_nrodias_parto,calcu_fecaprox_parto },
    {
      where: {
        id: id
      },
    }
  );
  return { id,opcgesta,fur,fec_proba_parto,eco_nro_sem_emb,eco_nro_dias_emb,hemoglo,calcu_nrosema,calcu_nrodias,calcu_nrodias_parto,calcu_fecaprox_parto };
};

const deleteT05etapagesta = async (id) => {
  await db.T05_etapagesta.destroy({
    where: { id: id },
  });
};


module.exports = {
    getAllT05etapagesta,
    findT05etapagestaById,
    createT05etapagesta,
    updateT05etapagesta,
    deleteT05etapagesta,  
};