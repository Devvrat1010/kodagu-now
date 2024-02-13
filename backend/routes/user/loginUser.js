const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const User=require('../../models/user')
const bcrypt=require('bcrypt')
const maxAge=3*24*60*60

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY ,{
        expiresIn:maxAge
    })
}

router.post('/', async (req, res) => {
    try {
        const {email,password}=req.body
        const curr=await User.findOne({email:email})
        if (curr){
            const comparing=bcrypt.compareSync(password,curr.password)
            if (comparing){
                const token=createToken(curr._id)
                res.status(200).json({message:curr,token:token})
                return 
            }   
            else{
                res.status(200).json({error:"Invalid Credentials"})
                return
            }
        }
        else{
            res.status(200).json({error:"Invalid Credentials"})
            return 
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error:err,message:"server Side error"})
    }
});

module.exports = router;