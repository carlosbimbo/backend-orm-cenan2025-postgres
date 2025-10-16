const db = require("../config/db");

const getAllT05regisevent = async (ideven) => {
  return await db.T05_regisevent.findAll({ where: { ideven: ideven }});
};

const findT05regiseventById = async (ideven) => {
  console.log('findT05regiseventById id : ' + ideven)
  return await db.T05_regisevent.findOne({
    where: {
      ideven: ideven
    }
  });
};

const createT05regisevent = async ({ ideven,iduser,tipo,fecha,hora,descrip,alarma,estado }) => {
  const newT05regisevent = await db.T05_regisevent.create({ ideven,iduser,tipo,fecha,hora,descrip,alarma,estado });
  return newT05regisevent;
};

const updateT05regisevent = async ({ ideven,iduser,tipo,fecha,hora,descrip,alarma,estado }) => {
  await db.T05_regisevent.update(
    { ideven,iduser,tipo,fecha,hora,descrip,alarma,estado },
    {
      where: {
        ideven: ideven
      },
    }
  );
  return { ideven,iduser,tipo,fecha,hora,descrip,alarma,estado };
};

const deleteT05regisevent = async (ideven) => {
  await db.T05_regisevent.destroy({
    where: { ideven: ideven },
  });
};


module.exports = {
    getAllT05regisevent,
    findT05regiseventById,
    createT05regisevent,
    updateT05regisevent,
    deleteT05regisevent,  
};