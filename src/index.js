/*
 * Acceso principal al proyecto
 */


const express = require('express')
const configureMiddleware = require("../src/config/middleware");
const app = express()

const router = require('./routes/authRoutes')

configureMiddleware(app);

app.use(router)

app.listen(3020, () => {
  console.log("Server is running!\nAPI 3020" )
})
