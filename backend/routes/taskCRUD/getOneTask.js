const express=require('express');
const router=express.Router();
const Task=require('../../models/task')

router.get('/:id', async (req, res) => {
    try {
        const {id}=req.params
        const task=await Task.findOne({_id:id})
        if (task){
            res.status(200).json({message:task})
            return 
        }
        else{
            res.status(200).json({error:"Task Does not exist"})
            return 
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err,message:"SErver side error"})
    }
});

module.exports = router;