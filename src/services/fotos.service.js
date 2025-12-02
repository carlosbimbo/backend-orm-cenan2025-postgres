const db = require("../config/db");

exports.obtenerFotosUsuario = async (username) => {
  
  const user = await db.User.findOne({ where: { username } });
  if (!user) return null;
  
  const suplementos = await db.T05_suplement.findAll({
    where: { iduser: user.id },
    attributes: ["foto"]
  });
  
  const baseUrl = "https://www.macrocorpsystem.com/cenan2025";

  const fotos = suplementos
    .filter(s => s.foto)
    .map(s => ({
      foto: s.foto,
      url: `${baseUrl}/fotoscapture/${s.foto}`
    }));

  return fotos;
};
