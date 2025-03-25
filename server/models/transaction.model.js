const { default: mongoose } = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family", default: null },
    amount: Number,
    category: String,
    date: Date,
    description: String
  });

  module.exports = mongoose.model("Transaction", TransactionSchema)