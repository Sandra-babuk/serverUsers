const mongoose = require('mongoose')

const dbConnnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnnection).then(res=>{
    console.log("Mongodb Atlas connected successfully with testServer");
    
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
    
    
})