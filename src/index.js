/*
 * Acceso principal al proyecto
 */

const express = require('express')
const path = require('path');
const configureMiddleware = require("../src/config/middleware");
const app = express()

const router = require('./routes/authRoutes')

configureMiddleware(app);

app.use(
  "/cenan2025/fotoscapture",
  express.static(path.join(__dirname, "fotoscapture"))
);

app.use(router)

app.listen(8099, () => {
  console.log("Server is running!\nAPI 8099" )
})

