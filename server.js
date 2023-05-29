const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser= require('cookie-parser');
require('dotenv').config({path: './config/.env'})
require('./config/db')
const cors = require('cors');
const {checkUser , requireAuth }=require('./middleware/authMiddleware');
const path= require('path');
const PORT = process.env.PORT || 5000;

//chemin qui nous permet d'accéder aux fonctions d'authentification

const rdvRouter = require ('./routes/rdv.routes');
const proRouter= require('./routes/pro.routes');
const userRouter= require('./routes/user.routes');

// Instructions qui permet de parser les informations du user
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

// app.use(
//     cors({
//         origin:"https://agendaenligne.herokuapp.com/",
//         credentials: true,
//         "allowedHeaders": ['sessiodId', 'Content-type'],
//         'exposedHeaders': ['sessionId'],
//         'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         'preflightContinue':false

//     })
// )
//jwt
app.use('*', checkUser);
app.use('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
})



//Accés aux pages
app.use("/user", userRouter);
app.use('/rdv',rdvRouter);
app.use('/pro',proRouter);

//Allow origin from the server with PORT = 3000


//Création de notre port serveur


app.get("/",(req,res) => {
  res.send("Running")
})

app.listen(PORT, () => {
   console.log('Listening on port '+PORT);
})
