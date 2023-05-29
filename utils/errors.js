//Fichier definissant les fonctions gerant les erreurs 


// Erreurs affichées au cas où une information n'est pas respectée
//Argument : les erreurs 
//Retour : le(s) messages d'erreurs 
module.exports.signUPerrors = (err) => {
    let errors = {email : '' , password: '' , nom: '', prenom: '', dateNaiss:'', Num_tel:''};


    if(err.message.includes('email'))
        errors.email= "Email incorrect";


    if(err.message.includes('password'))
        errors.password= "Mot de passe court, veuillez entrer au moins 6 caractères";


    if(err.message.includes('nom'))
        errors.nom= "Nom court, veuillez entrer au moins 2 caractères"


    if(err.message.includes('prenom'))
        errors.prenom= "Prénom court, veuillez entrer au moins 2 caractères"

    if(err.message.includes('dateNaiss'))
        errors.dateNaiss= "Veuillez entrer votre date de naissance au format JJ/MM/YYYY"

    if(err.message.includes('Num_tel'))
        errors.Num_tel="Le numéro doit contenir 10 chiffres"

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email= "Email déjà enregistré";

    return errors;
}

/* les erreurs qu'on affiche si le mail
 ou bien le mot de passe est faux*/
//Argument : les erreurs
//Retour : le(s) messages d'erreur
module.exports.signINerrors = (err) => {
    let errors= {email: '' , password: ''};

    if(err.message.includes('email')){
        errors.email= "Email inconnu";
    }

    if(err.message.includes('password')){
        errors.password= "Mot de passe incorrect";
    }
    return errors;
} 

//Fonction manipulant les erreurs lors de la modification des informations 
//Argument : le(s) erreurs
//Retour : les messages d'erreur 
module.exports.updateErrors = (err) => {
    let errors = {
      email: "",
      controlPassword: "",
      nom: "",
      prenom: "",
      Num_tel: "",
    };
    if (err.message.includes("email")) errors.email = "Email incorrect ou déjà enregistré";
  
    
  
    if (err.message.includes("nom"))
      errors.nom = "Nom court, veuillez entrer au moins 2 caractères";
  
    if (err.message.includes("prenom"))
      errors.prenom = "Prénom court, veuillez entrer au moins 2 caractères";
      
    if (err.message.includes("Num_tel"))
      errors.Num_tel = "Le numéro doit contenir 10 chiffres";
  
    return errors;
  };