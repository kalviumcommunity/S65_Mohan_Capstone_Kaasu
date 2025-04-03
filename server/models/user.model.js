const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["Admin", "Member", "Viewer"], default: "Member" },
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family" },
    insights: {type: String, default: ""}
  });
  

  module.exports = mongoose.model("User", UserSchema)