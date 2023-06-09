const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config({path:"./config/.env"})
const User = require("./models/user")
const router = express.Router()
const app = express()
connectDB()

//routes
app.use("/api", router)
router.use(express.json())
//get
// http://localhost:5001/api/user
router.get("/user", async(req,res)=>{
   try {
     const users = await User.find()
     res.status(200).json({message: "Getting All users", result:users})
   } catch (error) {
     res.status(504).json({Error:error})
   }
} )

//post
// http://localhost:5001/api/user
router.post("/user", async(req,res)=>{
    try {
      const {name} = req.body
      const newUser = new User({name})
      const user = await newUser.save()
      res.status(201).json({message: "user saved", result: user})
    } catch (error) {
      res.status(504).json({Error: error})
    }
 } ) 

//put
// http://localhost:5001/api/user/:id
router.put("/user/:id", async(req,res)=>{
    const {id}= req.params
    const {name} = req.body
    try {
        await User.findByIdAndUpdate({_id: id},{$set:{name: name}})
        res.status(200).json({message:"user update"})
    } catch (error) {
        res.status(500).json({messge : "server error"})
    }
})
//dalete
// http://localhost:5001/api/user/:id
router.delete("/user/:id", async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"use delete"})
    } catch (error) {
        res.status(500).json({messge : "server error"})
    }
})

const PORT = process.env.PORT
app.listen(PORT , (error)=>{
    error ? console.log(error)
    : console.log(`server runing or port${PORT}`)
})

