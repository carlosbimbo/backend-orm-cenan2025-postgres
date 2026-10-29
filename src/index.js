// index.js
/*
 * Acceso principal al proyecto
 */

const express = require('express');
const path = require('path');
const http = require('http'); // 1. Módulo nativo necesario para WebSockets
const WebSocket = require('ws'); // 2. Librería de WebSockets

const configureMiddleware = require("../src/config/middleware");
require("./jobs/alarmCron.job");

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('🟢 Nuevo usuario conectado al WebSocket');
  
  ws.on('close', () => {
    console.log('🔴 Usuario desconectado del WebSocket');
  });
});

// 6. Hacer global la variable 'wss' para que tu controlador pueda emitir mensajes
app.set('wss', wss);

const router = require('./routes/authRoutes');

configureMiddleware(app);

app.use(
  "/cenan2025/fotoscapture",
  express.static(path.join(__dirname, "fotoscapture"))
);

app.use(router);

// 7. CAMBIO CLAVE: Cambiar app.listen por server.listen para que escuche HTTP y WebSockets a la vez
server.listen(8099, () => {
  console.log("Server is running!\nAPI 8099 y WebSockets listos");
});