const express = require('express')
const app = express()
const bodyParser=require('body-parser')
require('dotenv').config({path: './config/.env'})
require('./config/db');

const indexRouter = require("./routes/index")

//Accés aux pages
app.use("/",indexRouter)


//Création de notre serveur
app.listen(process.env.PORT, () => {
    console.log('Listening on port $(process.env.PORT');
})
