const express= require("express");
const router = express.Router();
const authController=require('../controllers/authController')


//Accés a la page création de compte 
router.post("/register", authController.signUP);

module.exports= router;