// import mongoose
const mongoose = require('mongoose')

// connection string kodukkua
connectionString = process.env.DATABASE
mongoose.connect(connectionString).then((res)=>{
    console.log(`MongoDB connected successfully`);
    
}).catch((err)=>{
    console.log(`MongoDB connection failed ${err}`);
    
})