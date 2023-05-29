//Fichier defissant le schema d'un evenement dans la base de donnée

const mongoose = require ('mongoose');

const eventSchema = new mongoose.Schema(
    { 
        nameEvent:{
            type : String,
            required : true
        },  

        dateEvent:{
            type : Date,
            required : true
        },
    }
)
const eventModel= mongoose.model('event', eventSchema)
module.exports = eventModel ;