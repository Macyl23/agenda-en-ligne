// fichier regroupant toutes les fonctions liées au professionnelle

const EventModel = require("../models/eventModel");
const rdvModel = require("../models/rdvModel");
const model = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

/**Fonction recuperant les informations du professionel sauf le mot de passe 
 * 
 * @param {String} req: Les identifiants de l'utilisateur 
 * @param {Docs} res: Les informations de l'utilisateur 
 
*@returns : toutes les informations du professionel present dans la base de donnée excepte le mot de passe */
module.exports.proInfo = (req, res) => {
  
  model.Pro.findById("62403b9d3be99a7851425ec7", (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown " + err);
  }).select("-password");
};

/**
 * fonction permettant d'ajouter un evenement dans la base de données
 * @param {Date} dateEvent: La date de l'évènement 
 * @param {String} nom: Le nom de l'évènement
 * @returns {Object}: l'evenement crée ou bien message d'erreur
 */

module.exports.ajoutEvent = async (req, res) => {
  const dateHeure=  req.body.dateEvent + " " + req.body.heureEvent
  const nouvEvent = new EventModel({
    dateEvent: dateHeure,
    nameEvent: req.body.nameEvent,
    
  });
  try {
    const event = await nouvEvent.save();
    return res.status(201).json(event);
  } catch (err) {
    return res.status(400).send(err);
  }
};



/**
 * fonction affichant les evenements present dans la base de donnés 
 * @param {Docs} res: tous les documents dans le modele Event de la BD
 * @returns {Object} Les evenements 
 */ 
module.exports.afficheEvent = (req, res) => {
  EventModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log(err);
  });
};

/**
 * fonction affichant tous les rendez-vous present dans la base de donnée
 * @returns  tous les rendez-vous pris
 */
module.exports.afficheRdv = (req, res) => {
  rdvModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log(err);
  });
};


/**
 * Fonction qui permet de modifier les informations du professionnel
 * @param {Object} req: Toutes les inforamtions du professionnel sauf le mot de passe
 * @returns message d'erreur si l'identifiant passé en parametre est incorrecte
 *  ou  message affichant " modifié " si les attrbuts ont été modifié ou l'erreur empechant la modification
 */
module.exports.updatePro = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const pro = await model.Pro.findById(req.params.id);

  try {
    if (pro) {
      console.log("Modification");
      pro.nom = req.body.nom || pro.nom;
      pro.prenom = req.body.prenom || pro.prenom;
      pro.email = req.body.email || pro.email;
      pro.Num_tel = req.body.Num_tel || pro.Num_tel;
      pro.de = req.body.de || pro.de;
      pro.a = req.body.a || pro.a;
      const updatedPro = await pro.save();
      res.status(200).send("Modifiée");
    }
  } catch (err) {
    const errors = updateErrors(err);
    res.status(201).json({ errors });
  }
};

/**
 * Fonction qui permet de modifier le mot de passe du professionel
 * @param {String} req.body.password: Mot de passe actuel du professionel
 * @param {String} req.body.newPassword: le nouveau mot de passe du professionel
 * @returns {String} message d'erreur si l'identifiant passé en parametre est incorrecte ou s'il y a des erreurs
 */

module.exports.changePassword = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const pro = await model.Pro.findById(req.params.id);
  try {
    if (pro) {
      if (pro.password === req.body.password) {
        if (req.body.newPassword) {
          pro.password = req.body.newPassword || pro.password;
          const updatedUser = await pro.save();
        }
      } else {
        throw Error("incorrect password");
      }
    }
  } catch (err) {
    const errors = signINerrors(err);
    res.status(200).json({ errors });
  }
};



