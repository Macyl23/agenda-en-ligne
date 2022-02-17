const UserModel= require("../models/userModel");


// fonction qui permet de créer son compte
module.exports.signUP= async(req,res) => {
    const {nom, prenom, email , password, dateNaiss, Num_tel } = req.body

    try {
        const user= await UserModel.create({ nom , prenom,email,password,dateNaiss,Num_tel});
        res.status(201).json({user: user._id});
    }
    catch(err){
        res.status(200).send({err})
    }
}