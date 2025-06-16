const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/db')
const { authMiddleware } = require('./middlewares/auth.middleware')
const {app, server} = require('./lib/socket')

require('dotenv').config()
const PORT = process.env.PORT

// const app = express()
app.use(cors({
  origin: "http://localhost:5173",
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