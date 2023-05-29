//Fichier permettant de faire les redirections entre les fonctions des clients  et les appel d'axios avec les données 


const express= require("express");
const router = express.Router();
const authController=require('../controllers/authController')
const userController=require('../controllers/userController');


//Accés a la page création de compte 
router.post("/register", authController.signUP);
router.post("/login", authController.signIN);

//Déconnexion et redirection vers page d'accueil
router.get("/", userController.getAllUsers);
router.get("/logout", authController.logout);

//Récuperer les informations d'un utilisateur 
router.get("/:id",userController.userInfo);

//Modification des parametres de l'utilisteur
router.put("/:id", userController.updateUser)

//Changer de mot de passe
router.put("/changePassword/:id",userController.changePassword)

module.exports= router;