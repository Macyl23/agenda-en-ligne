//Fichier permettant de faire les redirections entre les fonctions manipulant les rendez-vous  et les appel d'axios avec les données 

const router = require('express').Router()
const rdvController = require ('../controllers/rdvController')

router.post('/create/:id',rdvController.priseRdv) 
router.get('/:id',rdvController.afficheRdv) //parametre : id du user
router.post('/:id',rdvController.modifierRdv) // parametre : id du rdv à modifier
router.delete('/:id',rdvController.annulerRdv) // parametre : id du rdv à annuler

module.exports = router;