const express= require("express");
const router = express.Router();
const authController=require('../controllers/authController')
const userController= require('../controllers/userController')


//Accés a la page création de compte 
router.post("/register", authController.signUP);
router.post("/login", authController.signIN);


//Affichage des infos du client sans le mdp
router.get("/:id", userController.userInfo);

module.exports= router;