const { default: mongoose } = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: String,
    limit: Number,
    spent: { type: Number, default: 0 }
  });

  module.exports = mongoose.model("Budget", BudgetSchema)