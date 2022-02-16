const express=require('express')
const router=express.Router();
const authController=require('../controllers/authController')
const userController=require('../controllers/userController')

//Envoie de données a la fonction du controleur
router.post("/register", authController.signUP);
router.post("/login",authController.signIn);

router.get("/logout", authController.logOut);
router.put("/forgot-password", authController.forgotpassword);


router.get("/:id", userController.userInfo)
module.exports = router;