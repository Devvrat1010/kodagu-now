const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const User=require('../../models/user')
const bcrypt=require('bcrypt')

const saltRounds=10
const maxAge=3*24*60*60

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:maxAge
    })

}

const validate=async (username,email,password)=>{
    if (!username || !email | !password){
        return {message:"fill all the details"}
    }
    if (username.length<1 || email.length<1 || password.length <1){
        return {message:"fill all the details"}
    }
    if (username.includes(" ")){
        return {message:"Username can only contain alphanumeric characters and special characters"}
    }
    if (email.includes(" ")){
        return {message:"Invalid Email"}
    }
    if (password.length<6){
        return {message:"Password Length Must be atleast 6 characters long"}
    }
    return true
}


router.post('/', async (req, res) => {
    try {
        const {email,password,username}=req.body
        const existingMail = await User.findOne({ email: email });
        if (existingMail){
            res.status(200).json({error:"Email already exists"})
            return
        }
        const existingUsername = await User.findOne({ username: username })
        if (existingUsername){
            res.status(200).json({error:"Username already exists"})
            return
        }

        const validated=await validate(username,email,password)

        if (validated===true){
            const hash=bcrypt.hashSync(password,saltRounds)
            const newUser=await User.create({
                email:email,
                password:hash,
                username:username
            })
            const token=await createToken(newUser._id)
            res.status(200).json({message:newUser,token:token})
            return 
        }   
        else{
            res.status(200).json({error:validated.message || "server side rror "})
            return 
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err,message:"Server Side Error"})

    }
});

module.exports = router;