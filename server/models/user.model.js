const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    familyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    insights: {
        type: String
    },
    balance: {
        type: Number,
        default: 0
    },
    expenses: {
        type: Number,
        default: 0
    },
    savings: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("User", userSchema)