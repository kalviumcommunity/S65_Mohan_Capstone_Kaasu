const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["Admin", "Member", "Viewer"], default: "Member" },
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family", default: null },
    insights: {type: String, default: ""},
    balance: {type: String, default: "0"},
    expenses: {type: String, default: "0"}
  });
  

  module.exports = mongoose.model("User", UserSchema)