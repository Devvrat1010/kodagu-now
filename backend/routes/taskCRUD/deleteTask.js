const express=require('express');
const router=express.Router();
const Task=require('../../models/task');

router.post('/', async (req, res) => {
    try {
        const {id}=req.body
        const task=await Task.deleteOne({_id:id})
        res.status(200).json({message:"successfully deleted"})
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;