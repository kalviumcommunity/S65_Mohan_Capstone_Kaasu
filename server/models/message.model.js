const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    msg: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" , default: null}],
    family: [{ type: mongoose.Schema.Types.ObjectId, ref: "Family" , default: null}]
})

module.exports = mongoose.model("Message", messageSchema)