const express=require('express');
const router=express.Router();
const Task=require('../../models/task');

router.put('/:id', async (req, res) => {
    const { id } = req.params; // 'id' is a string here
    try {
        const updatedDocument = await Task.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        if (!updatedDocument) {
            return res.status(200).json({ error: 'Document not found' });
          }
        res.status(200).json(updatedDocument);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error:err,message:'Something went wrong' });
    }
});

module.exports = router;