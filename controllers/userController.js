//Fichier regroupant toutes les fonctions liées au client

const model = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;
const { signINerrors, updateErrors } = require("../utils/errors");
const bcrypt = require("bcrypt");

/**
 * Fonction permettant de recuperer les informations de tous les clients inscrits
 * @returns {JSON} informations sur tous les clients excepte la mot de passe 
 */

module.exports.getAllUsers = async (req, res) => {
  const users = await model.User.find().select("-password");
  res.status(200).json(users);
};

/**
 * Fonction permettant de recupere les informations d'un client
 * @param {String} req.params.id  
 * @returns {Docs} toutes les informations excepté le mot de passe s'il n'y pas d'erreur
 */

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown" + req.params.id);
  model.User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown " + err);
  }).select("-password");
};

/**
 * Fonction qui permet de modifier les informations du client
 * @param {String} req.params.id L'identifiant de l'utilisateur
 * @param {Object} req Les informations de l'utilisateur 
 * @returns {JSON} Message d'erreur si l'identifiant passé en parametre est incorrecte 
   Message affichant " modifié " si les attrbuts ont été modifié ou l'erreur empechant la modification
 */

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const user = await model.User.findById(req.params.id);

  try {
    if (user) {
      console.log("Modification");
      user.nom = req.body.nom || user.nom;
      user.prenom = req.body.prenom || user.prenom;
      user.email = req.body.email || user.email;
      user.Num_tel = req.body.Num_tel || user.Num_tel;
      const updatedUser = await user.save();
      res.status(200).send("Modifié");
    }
  } catch (err) {
    const errors = updateErrors(err);
    res.status(201).json({ errors });
  }
};

/**
 * Fonction qui permet de modifier le mot de pass de l'utilisateur
 * @param {String} req.params.id L'identifiant de l'utilisateur
 * @param {String} req.body.password Le mot de passe actuel de l'utilisateur 
 * @param {String} req.body.newPassword Le nouvaeu mot de passe de l'utilsiateur
 * @returns {JSON} Message d'erreur si l'identifiant passé en parametre est incorrecte ou s'il y a des erreurs
 */

module.exports.changePassword = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const user = await model.User.findById(req.params.id);
  try {
    if (user) {
      const auth = await bcrypt.compare(req.body.password, user.password);
      if (auth) {
        if (req.body.newPassword) {
          user.password = req.body.newPassword || user.password;
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
          const updatedUser = await user.save();
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
