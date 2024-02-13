const express=require('express');
const router=express.Router();
const Task=require('../../models/task');

router.get('/:username', async (req, res) => {
    try {
        const {username}=req.params
        const allTasks=await Task.find({username:username});
        res.status(200).json(allTasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server Error'});
    }
});

module.exports = router;