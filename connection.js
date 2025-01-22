// import mongoose
const mongoose = require('mongoose')

connectionstring = process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log('mongoose connected successfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
    
})