const fotoService = require("../services/fotos.service");

exports.getFotosPorUsuario = async (req, res) => {
  try {
    const { username } = req.params;

    const fotos = await fotoService.obtenerFotosUsuario(username);

    if (!fotos) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ fotos });

  } catch (error) {
    console.error("❌ Error obteniendo fotos:", error);
    return res.status(500).json({ error: "Error interno" });
  }
};
