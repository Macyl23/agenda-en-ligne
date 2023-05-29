//Fichier permettant de faire les redirections entre les fonctions du professionnel et les appel d'axios avec les données 

const express= require("express");
const router = express.Router();
const proController=require('../controllers/proController')
const authController=require('../controllers/authController');


router.post("/addEvent",proController.ajoutEvent) ;

router.get("/logout", authController.logout);

router.get('/event',proController.afficheEvent);
router.get('/rdv',proController.afficheRdv);
router.get('/',proController.proInfo);
router.put('/update',proController.updatePro);
router.put('/:id', proController.updatePro );
router.put("/changePassword/:id",proController.changePassword)
// router.delete("/suppEvent", proController.suppEvent);

module.exports= router;
