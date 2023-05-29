//Fichier defissant le schema d'un client et d'un professionnel dans la base de donnée

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


//Fonction pour verifier si un email est valides 
//Argument : un email
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

//schema d'un professionnel
const proSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase:true,
        unique: true,
        trim: true,
        validate:[validateEmail],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type:String,
        required: true,
        max: 1024,
        minlength: 6
    },
    nom: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
      },
      prenom: {
        type: String,
        required: true,
        minlength: 2,
      },
      Num_tel: {
        type: String,
        required: true,
        minLength: 10,
        maxlength: 12,
      },
      de:{
        type:Number,
        required:true,
      },
      a:{
        type:Number,
        required:true,
      }
    },
      {
        timestamps: true,
      },
      { typeKey: "$type" }
      
)
// Schéma d'un client
const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 2,
    },
    prenom: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: [validateEmail],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    dateNaiss: {
      type: Date,
      required: true,
    },
    Num_tel: {
      type: String,
      required: true,
      minLength: 10,
      maxlength: 12,
    },
  },
  {
    timestamps: true,
  },
  { typeKey: "$type" }
);




// Vérification que l'utilisateur existe dans la BD et tester la validité du mot de passe
//Argument : un email et un mot de passe 
userSchema.statics.login = async function (email, password) {
  const user = await UserModel.findOne({ email });
  if (user) {
    console.log("l'email appartient au client");
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    const pro = await ProModel.findOne({ email });
    if (pro) {
      if (pro.password == password) {
        console.log("Mot de passe identique");
        return pro;
      }
      throw Error("incorrect password");
    }
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);
const ProModel = mongoose.model("pro",proSchema);
module.exports = {
    User: UserModel,
    Pro: ProModel
}
