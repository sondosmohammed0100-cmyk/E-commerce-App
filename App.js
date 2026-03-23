//require dotenv
require('dotenv').config();
//require express
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
//create express app
const app = express();
app.use(morgan('dev'));
app.use(cors());
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
const productRouter=require('./Router/Product.router');
const errorHandler = require('./Middelware/errorHandler');


//use routes
app.use('/images', express.static('Uploads'));
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products',productRouter)
app.use(errorHandler);

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