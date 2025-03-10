const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require('./models/user')
require("dotennv").config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB)

app.post('/login', (req,res)=>{
    const {email,password} = req.body
    userModel.findOne({email: email})
    .then(user=>{
        console.log(user);
        if(user){
            if(user.password === password){
                res.json("Success")
            } else{
                res.json("password is incorrect")
            }
        } else{
            res.json("record does not exist")
        }
    })
})

app.post('/signup',(req,res)=>{
    userModel.create(req.body).then(
        users => res.json(users)
    ).catch(err => console.log(err) 
    )
})

app.listen(3000, ()=>{
    console.log("server running");
})