// fonction permettant de se connecter à la base de donnée mongoose

const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://" + "macyl23:macylux"+ "@cluster0.o5vri.mongodb.net/agenda-en-ligne",
    {
        useNewUrlParser: true,
    }
)
.then(() => console.log("Connected"))
.catch((err) => console.log("log failled",err));