const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/router')
require('./dbconnection/connection')

const testServer = express()

testServer.use(cors())
testServer.use(express.json())
testServer.use(router)

const PORT = 3000 || process.env.PORT


testServer.listen(PORT,()=>{
    console.log(`testServer started at port:${PORT} and waiting for client request!!!`);
    
})
// resolving client request
testServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;"> testServer started at port:${PORT} and waiting for client request!!!</h1>`)

})