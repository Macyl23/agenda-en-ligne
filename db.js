const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.o5vri.mongodb.net/agenda-en-ligne",
    {
        useNewUrlParser: true,
    }
)
.then(() => console.log("Connected"))
.catch((err) => console.log("log failled",err));
