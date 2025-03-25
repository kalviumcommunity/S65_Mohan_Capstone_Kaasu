const express = require('express')
const app = express()
const connectDB = require('./config/db')
require('dotenv').config()


app.use(express.json())

app.use('/api/auth', require('./routes/user.route'))
app.use('/api/transaction', require('./routes/transaction.route'))
app.use('/api/budget', require('./routes/budget.route'))
app.use('/api/family', require('./routes/family.route'))

const PORT = 3000
app.listen(PORT, () => {
    try {
        connectDB()
        console.log(`Server is Running at ${PORT}`)
    } catch (error) {
        console.error("Error: ", error.message)
    }
})