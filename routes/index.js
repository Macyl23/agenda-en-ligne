const express=require('express')
const router=express.Router()

//Se connecter
router.get("/", (req,res) => {
    res.send("hello world")
})

module.exports=router