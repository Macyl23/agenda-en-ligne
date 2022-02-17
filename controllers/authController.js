const UserModel= require("../models/userModel");
const bcrypt= require('bcrypt');



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

module.exports.signIN = async(req , res ) => {
    const {email , password} = req.body
    try{
        const user= await UserModel.findOne({email : email});
        if(user) {
            const auth= await bcrypt.compare(password , user.password);
            if(auth){
                console.log("Client trouvé");
                res.status(200).json({user: user._id})
            }
        }
    }catch(err){
        res.status(200).json(err);
    }
}