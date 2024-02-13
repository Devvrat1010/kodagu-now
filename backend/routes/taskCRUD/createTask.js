const express=require('express');
const router=express.Router();
const Task = require('../../models/task');
const User = require('../../models/user');

router.post('/', async (req, res) => {
        const {username,assignee,title,description,dueDate,completed} = req.body;
        try {
            const existing=await User.findOne({username:username})
            if (!existing){
                res.status(200).json({error:"User not found"})
                return
            }
            else{
                const newTask = await Task.create(req.body);
                res.status(200).json({message:newTask,id:newTask._id});
            }
            return
        }
        catch (err) {
            console.log(err);
            res.status(500).json({error: 'Something went wrong'});
            return
        }
});

module.exports = router;