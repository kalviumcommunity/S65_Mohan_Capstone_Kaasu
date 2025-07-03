const { default: mongoose } = require("mongoose");

const FamilySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    uniqueCode: {
      type: String,
      unique: [true],
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" , default: null}],
    bills: [{name: String, price: Number,link: String}]
  });

  module.exports = mongoose.model("Family", FamilySchema)