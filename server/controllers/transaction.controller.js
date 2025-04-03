const Transaction = require("../models/transaction.model");
const processPDF = require('../utils/ai')
const getInsights = require('../utils/insights')
const User = require('../models/user.model')

const createTransaction = async (req, res) => {
    const userId = req.user.id
    const familyId = req.user.familyId
    const { amount, status, category, date, description } = req.body;

    try {
        const newTransaction = new Transaction({ userId, familyId, amount, status, category, date, description });
        await newTransaction.save();
        
        return res.status(201).json({ msg: "Transaction Created Successfully", newTransaction });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user.id
        const transactions = await Transaction.find({ userId });

        if (!transactions.length) {
            return res.status(404).json({ msg: "No Transactions Found" });
        }
        return res.status(200).json({ msg: "Transactions Found Successfully", transactions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const getFamilyTransactions = async (req, res) => {
    try {
        const familyId = req.user.familyId 
        const transactions = await Transaction.find({ familyId });

        if (!transactions.length) {
            return res.status(404).json({ msg: "No Transactions Found" });
        }

        return res.status(200).json({ msg: "Transactions Found Successfully", transactions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const editTransaction = async (req, res) => {
    try {
        const { id } = req.params; 
        const { amount, status, category, date, description } = req.body;

        const transaction = await Transaction.findByIdAndUpdate(
            id,
            { amount, status, category, date, description },
            { new: true } 
        );

        if (!transaction) {
            return res.status(404).json({ msg: "Transaction Not Found" });
        }

        return res.status(200).json({ msg: "Transaction Updated Successfully", transaction });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params; 

        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ msg: "Transaction Not Found" });
        }

        return res.status(200).json({ msg: "Transaction Deleted Successfully", transaction });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};
const uploadPDF = async (req,res) => {
    try {
    const {parsedJson, insights, info} = await processPDF(`${req.file.path}`)
    // const transactionToString = JSON.stringify(transactions)
    // console.log(transactionToString)
    // const insights = await getInsights(transactionToString)

    const newInfo = JSON.parse(info)
    const user = await User.findByIdAndUpdate(req.user.id, {insights, balance: newInfo[0], expenses: newInfo[1]})
    const uidTransactions = parsedJson.transactions.map(el => ({
        userId: req.user.id, 
        ...el
    }));
    const newTransactions = await Transaction.insertMany(uidTransactions)
    res.status(200).json({newTransactions, user})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
}
module.exports = { 
    createTransaction, 
    getUserTransactions, 
    getFamilyTransactions, 
    editTransaction, 
    deleteTransaction ,
    uploadPDF
};
