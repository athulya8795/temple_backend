// 10. import dotenv
require('dotenv').config()

// 1. import express
const express = require('express')

// 5. import cors
const cors = require('cors')

// 8. import router
const router = require('./router')

// 11. import connect
require('./connection')

// 2. create seerver
const tvServer = express()

// 6. server using cors
tvServer.use(cors())

// 7. parse the data - middleware - parse the data
tvServer.use(express.json())

// 9. use router
tvServer.use(router)

//exporting upload folder
tvServer.use('/upload',express.static('./uploads'))

// 3. port
const PORT = 4000 || process.env.PORT

// 4.listen
tvServer.listen(PORT, () => {
    console.log(`server running successfully at port number ${PORT}`);
})