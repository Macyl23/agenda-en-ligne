const mongoose= require('mongoose');
const {isEmail}= require('validator');
const bcrypt=require('bcrypt');
const req = require('express/lib/request');
require('mongoose-type-email');


// Schéma d'un client
const userSchema= new mongoose.Schema(
    {
        nom: {

            type: String,
            required: true,
            maxlength: 50,
            minlength: 2
        },
        prenom: {
            type: String,
            required:true,
            minlength: 2    
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            validate: [isEmail],
            lowercase:true,
            unique: true,
            trim: true
        },
        password: {
            type:String,
            required: true,
            max: 1024,
            minlength: 6
        },
        dateNaiss: {
            type: Date,
            required:true
        },
        Num_tel: {
            type: Number,
            required: true,
            minLength: 10
        },
        resetLink: {
            data: String,
            default: ""
        }
    },
    {

        timestamps: true,
    },
    {typeKey: '$type'}
)
// fonction de cryptage du mot de passe
userSchema.pre("save", async function(next){
    const salt= await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password, salt);
    next();
});

 /*userSchema.statics.login = async function(req , res) {
    console.log("Je suis dans la fonction schema login")
    console.log("email dans la fonction login = " + req.body.email);
    const user = await this.findOne({ email  });
    if(user){
        console.log("email trouve");
        const auth =await bcrypt.compare(password ,user.password );
        if(auth){
            console.log("mot de passe trouve")
            return user;
        }
        throw Error("Incorect password")
    }
    throw Error("Incorrect email")
 };*/



const UserModel= mongoose.model('user', userSchema)
module.exports= UserModel


