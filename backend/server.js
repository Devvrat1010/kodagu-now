require('dotenv').config();

const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
    
const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbURI=process.env.DB_URI
const port = process.env.PORT || 3000;

// Task routes 
const createTask = require('./routes/taskCRUD/createTask');
const deleteTask = require('./routes/taskCRUD/deleteTask');
const getAllTasks = require('./routes/taskCRUD/getAllTasks');
const getOneTask = require('./routes/taskCRUD/getOneTask');
const updateTask = require('./routes/taskCRUD/updateTask');
const createdTask = require('./routes/taskCRUD/createdTask');
const createMultipleTask = require('./routes/taskCRUD/createMultipleTask');

// user routes
const createUser = require('./routes/user/createUser');
const loginUser = require('./routes/user/loginUser');
const checkuser = require('./middleware/checkuser');


// user connection
app.use('/api/createUser', createUser);
app.use('/api/loginUser', loginUser);
app.use('/api/checkuser', checkuser);

// Task Routes connecitons
app.use('/api/createTask', createTask);
app.use('/api/deleteTask', deleteTask);
app.use('/api/getAllTasks', getAllTasks);
app.use('/api/getOneTask', getOneTask);
app.use('/api/updateTask', updateTask);
app.use('/api/createdTask', createdTask);
app.use('/api/createMultipleTask', createMultipleTask);

const startServer = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err,message:"server did not start" })
    }
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

startServer();