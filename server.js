const express = require('express')
const app = express()
const bodyParser=require('body-parser')
require('dotenv').config({path: './config/.env'})
require('./config/db');

const connexionRouter= require('./routes/create.account')
const indexxRouter=require('./routes/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



//Utilisation des routes
app.use("/",indexxRouter)
app.use("/create.account",connexionRouter)


//Création de notre serveur
app.listen(process.env.PORT, () => {
    console.log('Listening on port $(process.env.PORT');
})
