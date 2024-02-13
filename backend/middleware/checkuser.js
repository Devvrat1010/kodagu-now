const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const User=require('../models/user')

const maxAge=3*24*60*60

router.get("/",async (req,res)=>{
    const token=req.get("Authorization")
    if (token){
        jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,decodedToken)=>{
            if (err){
                res.status(200).json({error:err,message:"Server Error"})
                return 
            }
            else{
                const user=await User.findById(decodedToken.id)
                res.status(200).json({user:user})
                return
            }
        })
        return 
    }
    else{
        res.status(400).json({error:"No Token Found"})
        return 
    }
})

module.exports=router