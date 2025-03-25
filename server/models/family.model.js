const { default: mongoose } = require("mongoose");

const FamilySchema = new mongoose.Schema({
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  });

  module.exports = mongoose.model("Family", FamilySchema)