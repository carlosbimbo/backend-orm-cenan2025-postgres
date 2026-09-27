// pushNotification.service.js

const axios = require("axios");

async function sendPush({ token, alarm }) {

  if (!token) {
    return {
      error: "Token nulo"
    };
  }

  try {

    const payload = {
      to: token,

      title: "💧👶 GestApp te recuerda",

      body: alarm.message,

      // IMPORTANTE:
      // Tiene que coincidir exactamente con el
      // Notification Channel creado en Android.
      channelId: alarm.channelId,

      // Alta prioridad para Android.
      priority: "high",

      data: {
        idalar: String(alarm.idalar)
      }
    };

    console.log(
      "======================================"
    );

    console.log(
      "📤 ENVIANDO PUSH"
    );

    console.log(
      JSON.stringify(payload, null, 2)
    );

    console.log(
      "======================================"
    );


    const response = await axios.post(

      "https://exp.host/--/api/v2/push/send",

      payload,

      {
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json"
        }
      }
    );


    console.log(
      "📥 RESPUESTA EXPO:"
    );

    console.log(
      JSON.stringify(
        response.data,
        null,
        2
      )
    );


    return response.data;

  } catch (error) {

    console.error(
      "❌ ERROR ENVIANDO PUSH:"
    );

    console.error(
      error.message
    );

    if (error.response) {

      console.error(
        "❌ Respuesta servidor:",
        JSON.stringify(
          error.response.data,
          null,
          2
        )
      );

      return error.response.data;
    }

    return {
      error: error.message
    };
  }
}


module.exports = {
  sendPush
};