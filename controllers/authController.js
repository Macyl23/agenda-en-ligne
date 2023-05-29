//fichier gerant la connexion, l'inscription et le deconnexion 

const model = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { signUPerrors, signINerrors } = require("../utils/errors");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const bcrypt = require("bcrypt");

/**
 * Fonction qui crée un jeton JWT et l'attribue au user grace a l'identifiant passé en paramètres
 * @param {String} id L'identifiant de l'utilisateur qui se connecte
 * @returns {String} Jeton JWT associé à l'identifiant 
 */
 
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

/**
 * fonction qui permet a l'utilsateur de créer son compte
 * @param {Object} req Toutes les informations que l'utilisateur entre à son inscription
 * @param {Object} res Docs de l'utilisateur crée dans la BD
 * @returns {JSON} identifiant du client si l'inscrirption a bien été effectué, l'erreur sinon
 */

module.exports.signUP = async (req, res) => {
  try {
    const newClient = new model.User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      dateNaiss: req.body.dateNaiss,
      Num_tel: req.body.Num_tel,
      email: req.body.email,
      password: req.body.password,
    });
    if(req.body.password){
      const salt = await bcrypt.genSalt();
      newClient.password = await bcrypt.hash(newClient.password, salt);
    }
    const client = await newClient.save();
    res.status(201).json({ client: client._id });
  } catch (err) {
    const errors = signUPerrors(err);
    res.status(200).send({ errors });
  }
};

/**
 * Fonction qui permet la connexion et attribution d'un jeton JWT une fois la connexion établie
 * @param {String} req.body.email L'email de l'utilisateur
 * @param {String} req.body.password Le mot de passe de l'utilisateur 
 * @returns {json} identifiant du client si l'inscrirption a bien été effectué, l'erreur sinon
 */
module.exports.signIN = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await model.User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signINerrors(err);
    res.status(200).json({ errors });
  }
};

/**
 * fonction qui permet la déconnexion
 *
 * @param {Object} res Le cookie qui a été attribué à l'utilisateur 
 * @returns {*} suppression du jeton JWT et redirection vers la page d'acceuil
 */
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
