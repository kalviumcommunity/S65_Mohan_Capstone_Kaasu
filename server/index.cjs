const express = require('express')
const app = express()
const connectDB = require('./config/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middlewares/auth.middleware')
const cors = require('cors')
const path = require('path')

const _dirname = path.resolve()

// Middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: '*', 
    credentials: true
}))

// API Routes
app.use('/api/auth', require('./routes/user.route'))
app.use('/api/transaction', authMiddleware, require('./routes/transaction.route'))
app.use('/api/budget', authMiddleware, require('./routes/budget.route'))
app.use('/api/family', authMiddleware, require('./routes/family.route'))


app.use(express.static(path.join(_dirname, 'client', 'dist'))) 


app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'))
})


const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    try {
        await connectDB()
        console.log(`Server is running on port ${PORT}`)
    } catch (error) {
        console.error("Error:", error.message)
    }
})
