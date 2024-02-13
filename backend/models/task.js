const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    username:String,
    assignee:String,
    title: String,
    description:String,
    dueDate: Date,
    completed: Boolean,
    
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);