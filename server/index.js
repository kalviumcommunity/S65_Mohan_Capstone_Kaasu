const express = require('express')
const app = express()
const connectDB = require('./config/db')
require('dotenv').config()


app.use(express.json())


const PORT = 3000
app.listen(PORT, () => {
    try {
        connectDB()
        console.log(`Server is Running at ${PORT}`)
    } catch (error) {
        console.error("Error: ", error.message)
    }
})