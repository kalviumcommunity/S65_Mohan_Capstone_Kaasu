const { default: mongoose } = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family", default: null },
  
  amount: { type: Number}, 
  role: { type: String, enum: ["Out", "In"] }, 
  
  date: { type: String }, 
  value_date: { type: String }, 
  
  description: { type: String, }, 
  category: { type: String, }, 
  
  debit: { type: Number, default: null },  
  credit: { type: Number, default: null }, 
  balance: { type: Number }
});
  module.exports = mongoose.model("Transaction", TransactionSchema)