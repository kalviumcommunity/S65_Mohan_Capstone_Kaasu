const express = require('express')
const app = express()
const connectDB = require('./config/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middlewares/auth.middleware')
const cors = require('cors')



app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use('/api/auth', require('./routes/user.route'))
app.use('/api/transaction', authMiddleware,require('./routes/transaction.route'))
app.use('/api/budget',authMiddleware, require('./routes/budget.route'))
app.use('/api/family',authMiddleware, require('./routes/family.route'))


const PORT = 3000
app.listen(PORT, () => {
    try {
        connectDB()

        console.log(`Server is Running at ${PORT}`)
    } catch (error) {
        console.error("Error: ", error.message)
    }
})