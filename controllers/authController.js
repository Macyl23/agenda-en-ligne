const UserModel= require('../models/user.model')
const jwt = require("jsonwebtoken")
const maxAge=3 * 24 * 60 * 60 * 1000;
const bcrypt=require('bcrypt');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox10d0cfff9e444f16be93d36807510f47.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

 

const createToken = (id) =>{
    return jwt.sign({id} , process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    })
}
//fonction qui permet de créer son compte
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

// Controle que l'utilisateur existe dans la BD
module.exports.signIn= async (req, res) => {
    const {email , password} = req.body
    try{
        const user= await UserModel.findOne({email : email});
        console.log(user._id);
        if(user) {
            console.log("email trouve")
            const auth= await bcrypt.compare(password , user.password);
            if(auth){
                console.log("mot de passe trouve");
                
            }
        }
        const token= createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge});
        res.status(200).send({user: user._id})   
    }catch(err){
        res.status(200).json(err);
    }

    
}
module.exports.logOut= (req , res) => {
    res.cookie('jwt' ,  '' , {maxAge: 1});
    res.redirect('/');
}

module.exports.forgotpassword = (req ,res) =>{
    const {email } =req.body;

    UserModel.findOne({ email }, (err , user) => {
        
        if(err || !user){
            return res.status(200).json({error: "User with this email doesn't exist" });
        }
        const token=jwt.sign({_id: user._id} , process.env.JWT_PASS_FORGOT ,{expiresIn : '20m'});
        const data = {
            from: 'test@up.com',
            to: email,
            subject: "Reset Password",
            html:`
                <h2>Please click on the link</h2>
                <p> ${process.env.CLIENT_URL}/resetpassword/${token}</p>
            `  
        };  
        return UserModel.updateOne({resetLink: token}, function(err, success){
            if(err){
                return res.status(200).json({error: "link reset password error" });
            }else{
                mg.messages().send(data , function (error, body){
                    if(error){
                        return res.json({
                            error: error.message
                        })
                    }
                    return res.json({message : "Email sent succesfully"});
                })
            }
         })

    })
}