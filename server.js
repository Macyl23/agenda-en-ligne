const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const cookieParser= require('cookie-parser');
require('dotenv').config({path: './config/.env'})
require('./db');

const indexRouter = require("./routes/index")
const userRouter= require("./routes/user.routes");
const { checkUser, requireAuth } = require('./middleware/authmiddleware');

// Instructions qui permet de parser les informations du user
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

//jwt
app.use('*', checkUser);
app.use('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
})


//Accés aux pages
app.use("/",indexRouter)
app.use("/user", userRouter);


//Création de notre serveur
app.listen(process.env.PORT, () => {
    console.log('Listening on port $(process.env.PORT');
})
