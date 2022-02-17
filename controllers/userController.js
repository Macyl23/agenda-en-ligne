const UserModel = require("../models/userModel")
const ObjectID = require("mongoose").Types.ObjectId 

//On envoie l'id du client et ça nous affiche toutes ses informations excepté le mdp
module.exports.userInfo = (req, res) => {
    console.log(req.params)
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown" + req.params.id);
    UserModel.findById(req.params.id , (err, docs) => {
        if(!err) res.send(docs);
        else console.log("ID unknown " + err)
    }).select("-password");
}