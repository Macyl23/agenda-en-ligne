const mongoose=require("mongoose");
require('mongoose-type-email')


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
const UserModel= mongoose.model('user', userSchema)
module.exports= UserModel