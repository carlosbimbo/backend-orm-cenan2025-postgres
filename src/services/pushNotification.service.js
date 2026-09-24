const axios = require("axios");

async function sendPush({ token, alarm }) {
  if (!token) return { error: "Token nulo" };

  try {
    const response = await axios.post("https://exp.host/--/api/v2/push/send", {
      to: token,
      title: "💧👶 GestApp te recuerda",
      body: alarm.message,
      // CRÍTICO: No envíes el campo "sound" aquí para Android. 
      // Al no enviarlo, Android respetará la configuración sonora del channelId.
      channelId: alarm.channelId, 
      priority: "high",
      data: { idalar: alarm.idalar },
    });
    
    return response.data;
  } catch (error) {
    console.error("❌ Error enviando a Expo HTTP:", error.message);
    return error.response ? error.response.data : { error: error.message };
  }
}

module.exports = { sendPush };