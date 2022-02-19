const UserModel= require("../models/userModel");
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const { signUPerrors, signINerrors } = require("../utils/errors.utils");
const maxAge=3 * 24 * 60 * 60 * 1000;

// fonction qui crée un jeton jwt
const createToken = (id) =>{
    return jwt.sign({id} , process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    })
}

// fonction qui permet de créer son compte
module.exports.signUP= async(req,res) => {
    const {nom, prenom, email , password, dateNaiss, Num_tel } = req.body

    try {
        const user= await UserModel.create({ nom , prenom,email,password,dateNaiss,Num_tel});
        res.status(201).json({user: user._id});
    }
    catch(err){
        const errors = signUPerrors(err);
        res.status(200).send({errors})
    }
}

// fonction qui permet la connexion
module.exports.signIN = async(req , res ) => {
    const {email , password} = req.body
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id})
      } catch (err){
        const errors = signINerrors(err);
        res.status(200).json({ errors });
      }
}

// fonction qui permet la déconnexion
module.exports.logout= (req , res) => {
    res.cookie('jwt', '' , {maxAge: 1});
    res.redirect('/');
}