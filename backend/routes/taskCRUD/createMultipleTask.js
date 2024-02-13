const express=require('express');
const router=express.Router();
const Task=require('../../models/task')

router.post('/', async (req, res) => {
    
    try {
        const task=await Task.insertMany(req.body)
        res.status(200).json({message:task})
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;