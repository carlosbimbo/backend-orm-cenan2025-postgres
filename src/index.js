/*
 * Acceso principal al proyecto
 */

/*
const express = require('express')
const configureMiddleware = require("../src/config/middleware");
const app = express()

const router = require('./routes/authRoutes')

configureMiddleware(app);

app.use(router)

app.listen(8099, () => {
  console.log("Server is running!\nAPI 8099" )
})
*/

const express = require("express");
const configureMiddleware = require("../src/config/middleware");
const path = require("path");

const app = express();

// Middlewares globales
configureMiddleware(app);

// 🔥 PUBLICAR FOTOSCAPTURE
app.use(
  "/cenan2025/fotoscapture",
  express.static(path.join(__dirname, "fotoscapture"))
);

// Rutas de la API
const router = require("./routes/authRoutes");
app.use("/cenan2025", router);

// Servidor
app.listen(8099, () => {
  console.log("Server is running!\nAPI 8099");
});

