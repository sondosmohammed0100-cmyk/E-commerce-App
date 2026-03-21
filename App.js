//require dotenv
require('dotenv').config();
//require express
const express = require('express');
const app = express();
//for parsing application/json  
app.use(express.json());
//connect to database
const mongoose = require('mongoose');
const connectDB = process.env.DB_MONGOOSE_URL;
async function dbConnect(){
    try{
        await mongoose.connect(connectDB);
        console.log('Connected to database');
    }
    catch(err){
        console.log('Error connecting to database:', err);
    }

}
dbConnect();

//require routes
const authRouter = require('./Router/auth.router');
const categoryRouter = require('./Router/Category.router');


//use routes
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);


//listen on server
const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    try{
        console.log(`Server is running on port ${port}`);
    }
    catch(err){
        console.log('Error starting server:', err);
    }
});