//Fichier defissant le schema d'un rendez-vous dans la base de donnée

const mongoose = require ('mongoose');

const rdvSchema = new mongoose.Schema(
    {   
        dateRdv:{
            type : Date,
            required : true,
            unique: true
        },
        clientID: {
            type : String, // id du du client à qui est associé ce rendez vous
            required: true
        },
    }
)
const rdvModel= mongoose.model('rdv', rdvSchema)
module.exports = rdvModel ;
