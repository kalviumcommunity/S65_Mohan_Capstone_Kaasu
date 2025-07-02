const getInsights = require("../ai/getInsights")
const processPDF = require("../ai/transactionExtractor")
const Transaction = require('../models/transaction.model')
const User = require("../models/user.model")


const getAllTransactions = async (req,res) => {
    try {
        const transactions = await Transaction.find({userId: req.user.userId})
        if(!transactions){
            return res.status(404).json({message: "Transactions not Found !"})
        }
        return res.status(200).json({message: "Transactions Found Successfully !!", transactions})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

const uploadPDF = async (req,res) => {
    try {
        const path = req.file.path
        const userId  = req.user.userId
        const parsedJson = await processPDF(`${path}`)
        const uidTransactions = parsedJson.transactions.map(el => ({
        userId,
        ...el
    }));
    const newTransactions = await Transaction.insertMany(uidTransactions)
    res.status(200).json({newTransactions})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

const deleteTransaction = async(req,res) => {
    try {
        const {id} = req.params
        await Transaction.findByIdAndDelete(id)
        return res.status(200).json({message: "Transaction Deleted Successfully !"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

const getAllInsights = async (req,res) => {
    try {
        const transactions = await Transaction.find({userId: req.user.userId})
        const insights = await getInsights(transactions.toString())
        console.log(insights)
        return res.status(200).json({message: "Insights got Successfully !", insights})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

module.exports = {uploadPDF, getAllTransactions, getAllInsights, deleteTransaction}