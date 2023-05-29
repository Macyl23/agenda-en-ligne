const jwt = require("jsonwebtoken");
const model = require("../models/userModel");

/**
 * Fonction qui permet de vérifier si les un utilisateur posséde un cookie JWT
 * Si oui l'utilisateur sera connecté directement sans se reconnecter
 * @param {Object} req: Le jeton JWT
 * @param {Docs} res: Les données de l'utilsiateur 
 */
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    console.log("je rentre");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await model.User.findById(decodedToken.id);
        let pro= await model.Pro.findById(decodedToken.id);
        if(user){
          res.locals.user = user;
          console.log(res.locals.user);
          next();
        }else if(pro){
          res.locals.user=pro;
          console.log(res.locals.user);
          next();
        }
      }
    });
  } else {
    console.log("je rentre pas");
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};