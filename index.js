// import .env
require('dotenv').config()

// import connection
require('./connection')

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./router')

// create server - for using express
const pfserver = express()

// server using cors
pfserver.use(cors())

// parse the data = written middleware when parse the data
pfserver.use(express.json())

// exporting upload folder 10.01.25
pfserver.use('/upload', express.static('./uploads'))

// server using router
pfserver.use(router)


// port
const PORT = 4000 || process.env.PORT

// listen - (server il enthelum errr indenkil kodukkunnath)
pfserver.listen(PORT,()=>{
    console.log(`PFserver running successfully in port number ${PORT}`);
    
})


// get 
pfserver.get('/',(req, res)=>{
    res.send(`get request received`)
})

// // send
// pfserver.post('/',(req, res)=>{
//     res.send(`post request received`)
// })

// //put
// pfserver.put('/',(req, res)=>{
//     res.send(`put request received`)
// })

// // delete
// pfserver.delete('/',(req, res)=>{
//     res.send(`delete request received`)
// })