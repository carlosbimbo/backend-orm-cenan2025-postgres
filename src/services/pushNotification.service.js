const axios = require("axios");

async function sendPush({ token, alarm }) {
  if (!token) return;

  await axios.post("https://exp.host/--/api/v2/push/send", {
    to: token,
    title: "💧👶 GestApp te recuerda",
    body: alarm.message,
    // IMPORTANTE: En iOS se usa el nombre del archivo con extensión
    //sound: `${alarm.sound}.wav`, 
    sound: alarm.sound, 
    // IMPORTANTE: En Android el canal define el sonido
    channelId: alarm.channelId, 
    priority: "high",
    data: { idalar: alarm.idalar },
  });
}

module.exports = { sendPush };
