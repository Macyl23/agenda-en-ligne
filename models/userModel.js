const mongoose=require("mongoose");
require('mongoose-type-email')
const bcrypt = require('bcrypt');



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
            required:true,
            min: '1920', // l'age le plus vieux s'agit de 102 ans
            
        },
        Num_tel: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 12
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

//crypter le mot de passe
userSchema.pre("save", async function(next){
    const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password , salt);
    next();
})


// Vérification que l'utilisateur existe dans la BD
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
};


const UserModel= mongoose.model('user', userSchema)
module.exports= UserModel