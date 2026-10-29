const valoracionService = require("../services/t05_valoracion_ruleta_service");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getLikesByMenu = async (req, res) => {
  try {
    const { idmenu } = req.params;
    const totalLikes = await valoracionService.countLikesByMenu(idmenu);
    
    return res.status(StatusCodes.OK).json({ 
      status: ReasonPhrases.OK, 
      message: StatusMessage.SUCCESS, 
      data: { totalLikes } 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

const saveOrUpdValoracionMenu = async (req, res) => {
  try {
    const totalLikes = await valoracionService.saveOrUpdateValoracion(req.body);
    const { idmenu } = req.body;

    // Obtener la instancia de WebSocket desde la app (debes configurarla en tu index.js principal)
    const wss = req.app.get('wss'); 
    if (wss) {
      const message = JSON.stringify({ type: 'LIKE_UPDATE', idmenu, totalLikes });
      wss.clients.forEach((client) => {
        if (client.readyState === 1) { // 1 = WebSocket.OPEN
          client.send(message);
        }
      });
    }

    return res.status(StatusCodes.OK).json({ 
      status: ReasonPhrases.OK, 
      message: StatusMessage.SUCCESS, 
      data: { totalLikes } 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { getLikesByMenu, saveOrUpdValoracionMenu };