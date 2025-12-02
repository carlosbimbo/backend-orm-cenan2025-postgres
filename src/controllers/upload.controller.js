// upload.controller.js
exports.saveFotosTomaSuple = async (req, res) => {
  try {
    if (req.invalidFile) {
      return res.status(400).json({
        ok: false,
        message: "Uno o más archivos NO son imágenes válidas",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ ok: false, message: "No se enviaron archivos válidos" });
    }

    const savedFiles = req.files.map(f => f.filename);

    return res.json({
      ok: true,
      message: "Fotos de Toma de Suplementos guardadas correctamente",
      archivos: savedFiles,
    });

  } catch (error) {
    console.error("Error guardando fotos:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};
