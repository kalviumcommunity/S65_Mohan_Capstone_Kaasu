const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/db')
const { authMiddleware } = require('./middlewares/auth.middleware')
const {app, server} = require('./lib/socket')

require('dotenv').config()
const PORT = process.env.PORT
// const app = express()
const currentUrl = process.env.NODE_ENV == "development" ? "http://localhost:5173" : "https://s65-mohan-capstone-kaasu-1.onrender.com"
app.use(cors({
  origin: currentUrl,
credentials: true
}));


app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', require('./routes/user.route'))
app.use('/api/transaction',authMiddleware, require('./routes/transaction.route'))
app.use('/api/family',authMiddleware, require('./routes/family.route'))


server.listen(PORT, () => {
    try {
        connectDB()
        console.log(`Server is running at ${PORT}`)
    } catch (error) {
        console.error(error.message)
    }
})