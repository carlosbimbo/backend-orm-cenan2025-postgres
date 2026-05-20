const db = require("../config/db");
const { sanitizeEmptyValues } = require("../utils/sanitizeEmptyValues");

/**
 * Elimina propiedades con valores null, undefined o "".
 */
function cleanObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && v !== ""
    )
  );
}

/**
 * Elimina secciones vacías u objetos vacíos.
 */
function cleanSection(section) {
  if (!section || Object.keys(section).length === 0) return undefined;
  if (Array.isArray(section) && section.length === 0) return undefined;
  return section;
}

const updateExpoPushTokenById = async (userId, expopushtoken) => {
  if (!userId) {
    throw new Error("El parámetro userId es obligatorio");
  }

  if (!expopushtoken) {
    throw new Error("El parámetro expopushtoken es obligatorio");
  }

  await db.User.update(
    { expopushtoken },
    {
      where: { id: userId },
      silent: false, 
    }
  );

  return await db.User.findByPk(userId, {
    attributes: ["id", "username", "expopushtoken", "updated_at"],
  });
};

const getAll = async () => {
  return await db.User.findAll();
};

const findUserById = async (id) => {
  return await db.User.findByPk(id);
};

const createUser = async (data) => {
  const cleanData = sanitizeEmptyValues(data);
  const newUser = await db.User.create(cleanData);
  return newUser;
};

const updateUser = async (data) => {
  const cleanData = sanitizeEmptyValues(data);  
  const { id } = cleanData;
  if (!id) {
    throw new Error("El campo 'id' es obligatorio para actualizar un usuario");
  }
  
  await db.User.update(cleanData, {
    where: { id },
  });
  
  const updatedUser = await db.User.findByPk(id);
  return updatedUser;
};

const saveOrUpdateUser = async (data) => {
  try {
    const { username } = data;

    if (username === undefined || username === null) {
      throw new Error("El campo 'id' es obligatorio para guardar o actualizar el usuario");
    }

    //const existingUser = await findUserById(id);
    const existingUser = await findUserByName(username);
    console.log('existingUser saveorudp username2910: ',existingUser)
        
    if (existingUser) {
      const userId = existingUser.id;
      console.log('existingUser suxxxx userId: ',userId);

      const updatedData = { ...data, id: userId };
      console.log("🟡 Actualizando usuario existente con username:", username);
      return await updateUser(updatedData);
    } else {
      console.log("🟢 No se encontró usuario con username:", username, "→ creando nuevo registro");
      return await createUser(data);
    }

  } catch (error) {
    console.error("🔴 Error en saveOrUpdateUser:", error.message);
    throw error;
  }
};

const saveOrUpdateUserArray = async (dataArray) => {
  try {    
    if (!Array.isArray(dataArray)) {
      throw new Error("El parámetro recibido no es un array de Usuarios");
    }
    const results = [];    
    for (const data of dataArray) {
      try {
        const { id,username } = data;
        console.log("📦 Procesando registro:", data);
        console.log("🔑 ID:", id);

        if (id === undefined || id === null) {
          throw new Error("El campo 'id' es obligatorio para guardar o actualizar");
        }

        if (username === undefined || username === null) {
          throw new Error("El campo 'username' es obligatorio para guardar o actualizar el usuario");
        }

        const existingUser = await findUserByName(username);

        if (existingUser) {
          console.log("🟡 Actualizando Usuario existente con ID:", id);
          const updated = await updateUser(data);
          results.push({ id, action: "updated", data: updated });
        } else {
          console.log("🟢 Creando nuevo Usuario con ID:", id);
          const created = await createUser(data);
          results.push({ id, action: "created", data: created });
        }
      } catch (innerError) {
        // Si un registro falla, lo capturamos pero seguimos con los demás
        console.error("🔴 Error procesando registro:", innerError.message);
        results.push({ error: innerError.message, data });
      }
    }

    return results;
  } catch (error) {
    console.error("🔥 Error general en saveOrUpdateUserArray:", error.message);
    throw error;
  }
};

const deleteUser = async (id) => {              
  await db.User.destroy({
    where: { id: id },
  });
};

const findUserByName = async (username) => {
  console.log('username : ' + username )
  return await db.User.findOne({
    where: {
      username: username,
    }
  });
};

//comment 19052026
/*
const findUserByUserandPassword = async (username,password) => {
  console.log('username : ' + username + ' - password : ' + password )
  return await db.User.findOne({
    where: {
      username: username,
      password: password,
    }
  });
};
*/

const findUserByUserandPassword = async (username, password) => {
  console.log('username : ' + username + ' - password : ' + password); 
  const cleanUsername = username.trim().toLowerCase();
  return await db.User.findOne({
    where: {
      username: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('username')),
        cleanUsername
      ),
      password: password,
    }
  });
};

const execquery = async () => {
  //const newUser = await db.sequelize.query("SELECT * FROM User", { type: QueryTypes.SELECT });
  //return newUser[0];
  //return await db.sequelize.query("SELECT * FROM User", { type: QueryTypes.SELECT });

  //salioo 03022024
  //const newUser = await db.sequelize.query("SELECT * FROM User where Id = $Id", { bind: { Id: 3 },type: db.sequelize.QueryTypes.SELECT });
  //return newUser;

  const newUser = await db.sequelize.query("exec SP_AUTH_LOGIN_USER_01 $Id,$name ", { bind: { id: 3,name: 'Wilder Chaveta22' },type: db.sequelize.QueryTypes.SELECT });
  return newUser;

};

const getUserDataByUsername = async (username) => {
  try {
    const user = await db.User.findOne({
      where: { username },
      include: [
        { model: db.T05_etapagesta, as: "etapasGestacionales", required: false },
        { model: db.T05_regisevent, as: "registroEventos", required: false },
        { model: db.T05_suplement, as: "registroSuplementos", required: false },
        { model: db.T05_agenda_gestacional, as: "agendaGestacional", required: false },
        { model: db.T05_dias_gestacion, as: "diasGestacion", required: false },
      ],
    });

    if (!user) return null;

    const userInfo = {
      usuarios: [
        cleanObject({
          id: user.id,
          username: user.username,
          password: user.password,
          dni: user.dni,
          nombape: user.nombape,
          lati: user.lati,
          longi: user.longi,
          altura: user.altura,
          lati_viv: user.lati_viv,
          longi_viv: user.longi_viv,
          altura_viv: user.altura_viv,
          profileimage: user.profileimage,
        }),
      ],
      _cantidad: user ? 1 : 0,
    };   
    
    const etapaGesta =
      user.etapasGestacionales && user.etapasGestacionales.length > 0
        ? {
            etapagesta: user.etapasGestacionales.map((g) =>
              cleanObject({
                id: g.id,
                opcgesta: g.opcgesta,
                fur: g.fur,
                fec_proba_parto: g.fec_proba_parto,
                eco_nro_sem_emb: g.eco_nro_sem_emb,
                eco_nro_dias_emb: g.eco_nro_dias_emb,
                hemoglo: g.hemoglo,
                calcu_nrosema: g.calcu_nrosema,
                calcu_nrodias: g.calcu_nrodias,
                calcu_nrodias_parto: g.calcu_nrodias_parto,
                calcu_fecaprox_parto: g.calcu_fecaprox_parto,
              })
            ),
            _cantidad: user.etapasGestacionales.length,
          }
        : undefined; 
    
    const eventos =
      user.registroEventos && user.registroEventos.length > 0
        ? {
            eventos: user.registroEventos.map((e) =>
              cleanObject({
                ideven: e.ideven,
                iduser: e.iduser,
                tipo: e.tipo,
                fecha: e.fecha,
                hora: e.hora,
                descrip: e.descrip,
                alarma: e.alarma,
                estado: e.estado,
              })
            ),
            _cantidad: user.registroEventos.length,
          }
        : undefined;
    
    const suplementos =
      user.registroSuplementos && user.registroSuplementos.length > 0
        ? {
            suplement: user.registroSuplementos.map((s) =>
              cleanObject({
                idsuple: s.idsuple,
                iduser: s.iduser,
                fecha: s.fecha,
                tipo_suple: s.tipo_suple,
                foto: s.foto,
                nro_sema: s.nro_sema,
                destinationuri: s.destinationuri,
              })
            ),
            _cantidad: user.registroSuplementos.length,
          }
        : undefined;
    
    const agendaGestacional =
      user.agendaGestacional && user.agendaGestacional.length > 0
        ? {
              agendaGestacional: user.agendaGestacional.map((a) =>
                cleanObject({
                  id: a.id,
                  nrosem: a.nrosem,
                  fec_marker: a.fec_marker,
                })
              ),
              _cantidad: user.agendaGestacional.length,
            }
          : undefined; 

    const diasGestacion =
        user.diasGestacion && user.diasGestacion.length > 0
          ? {
              diasGestacion: user.diasGestacion.map((d) =>
                  cleanObject({
                    id_diasg: d.id_diasg,
                    iduser: d.iduser,
                    nroseman: d.nroseman,
                    fec_seman: d.fec_seman,
                    fec_diagesta: d.fec_diagesta,
                  })
                ),
                _cantidad: user.diasGestacion.length,
              }
            : undefined;

    const CENAN2025 = cleanObject({
      ...(etapaGesta && { t_05_etapa_gestacional: etapaGesta }),
      ...(userInfo && { users: userInfo }),
      ...(eventos && { t_05_registro_eventos: eventos }),
      ...(suplementos && { t_05_registro_suplementos: suplementos }),
      ...(agendaGestacional && { t_05_agenda_gestacional: agendaGestacional }),
      ...(diasGestacion && { t_05_dias_gestacion: diasGestacion }),
    });

    return { CENAN2025 };
  } catch (error) {
    console.error("❌ Error al obtener datos del usuario:", error);
    throw new Error("Error interno al obtener los datos del usuario");
  }
};


module.exports = {
  getAll,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByName,
  findUserByUserandPassword,
  execquery,
  saveOrUpdateUser,
  getUserDataByUsername,
  saveOrUpdateUserArray,
  updateExpoPushTokenById
};