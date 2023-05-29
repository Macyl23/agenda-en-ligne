//fichier regroupant les fonctions manipulant les rendez-vous

const RdvModel = require("../models/rdvModel");
const ObjectID = require("mongoose").Types.ObjectId;
const EventModel = require("../models/eventModel");

/**
 * fonction qui crée un nouveau rendez-vous (rdv) dans la base de données
 * @param {Date} req.body.startDate La date du rendez-vous prise par l'utillisateur
 * @param {JSON} res Le contenu du rendez-vous crée
 * @returns Contenu du rendez-vous crée ou message d'erreur si le rdv n'a pas pu être créé
 */

module.exports.priseRdv = async (req, res) => {
  console.log("========fonction priseRdv========");
  const dateHeure = req.body.startDate;
  console.log(dateHeure);
  const nouvRdv = new RdvModel({
    dateRdv: dateHeure,
    clientID: req.params.id,
  });
  try {
    const rdv = await nouvRdv.save();
    return res.status(201).json(rdv);
  } catch (err) {
    return res.status(400).send(err);
  }
};


/**
 * Fonction qui récupère et affiche tous les rdv d'un utilisateur
 * @param {String} req.params.id L'identifiant de l'utilisateur qui est connecté
 * @param {Docs} res Document concernant l'utilisateur qui est dans la BD
 * @returns Les rendez-vous de l'utilisateur ou un message d'erreur
 */

module.exports.afficheRdv = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  if (!ObjectID.isValid(userId)) return res.status(400).send("ID not valid");
  else {
    RdvModel.find({ clientID: userId }, (err, docs) => {
      if (!err) res.send(docs);
      else console.log(err);
    });
  }
};

/**
 * Fonction qui permet de modifier un rendez-vous déjà présent dans la base de données
 * @param {String} req.params.id l'identifiant de l'utilisateur qui est connecté
 * @param {Date} req.body.startDate La date du rendez-vous qu'on veut modifier
 * @param {Docs} res Les documents modifiés pour l'utilisateur
 * @returns {String} message qui affiche le rdv avant la modification ou l'erreur
 */

module.exports.modifierRdv = (req, res) => {
  console.log("========fonction modifierRdv========");
  const rdvId = req.params.id;
  const dateHeure = req.body.startDate;
  console.log("variables recuperees"+rdvId+" "+dateHeure);
  if (!ObjectID.isValid(rdvId)) return res.status(400).send("Invalid ID");
  RdvModel.findByIdAndUpdate(rdvId, { dateRdv: dateHeure }, (err, docs) => {
    if (!err) {
      console.log("pas d'erreur");
      return res.status(200).send(docs);
    } else return res.status(500).send("Error");
  });
};

/**
 * Fonction qui permet de supprimer un rendez-vous ou un evenement déjà présent dans la base de données
 * @param {String} req.params.id L'identifiant de l'utilisateur qui est connecté
 * @param {String} res Message décrivant l'action qui s'est passé (Evenement supprimé ou rendez-vous supprimé)
 * @returns {Docs} Les rendez-vous de l'utilisateur existants dans la BD
 */


module.exports.annulerRdv =async  (req, res) => {
  console.log("========fonction annulerRdv========");
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Invalid ID");
    
  const event =await  EventModel.findById(req.params.id);
  
  if(event){
    EventModel.findByIdAndDelete(req.params.id, (err) =>{
    if(!err) return res.send("Event deleted");
    else return console.log(err);
  })
  }
  else{
  RdvModel.findByIdAndDelete(req.params.id, (err) => {
    
    if (!err) return res.send("deleted rdv id " + req.params.id);
    else return res.status(500).send("Error");
  });
}
};
