const Family = require('../models/family.model')
const User = require('../models/user.model')

const createFamily = async (req,res) => {
    try {
        const uniqueCode = Math.random().toString(36).substring(2,7);
        const {name} = req.body
        const newFamily = new Family({name, uniqueCode, members: [req.user.userId] })
        await newFamily.save()
        await User.findByIdAndUpdate(req.user.userId, {familyId: newFamily._id}, {new: true})
        return res.status(201).json({message: "New Family Created", newFamily})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

const joinFamily = async (req,res) => {
    try {
        const {uniqueCode} = req.body
        const family = await Family.findOne({uniqueCode})
        family.members.push(req.user.userId)
        await User.findByIdAndUpdate(req.user.userId, {familyId: family._id}, {new: true})
        await family.save()
        return res.status(201).json({message: "Joined successfully", family})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

const createBill = async(req,res) => {
    try {
        const {name, price} = req.body
        const user = await User.findById(req.user.userId)
        const family = await Family.findById(user.familyId)
        family.bills.push({name, price})
        await family.save()
        return res.status(201).json({message: "Bill created", family})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

const deleteBill = async (req,res) => {
    try {
        const {id} = req.body
        const user = await User.findById(req.user.userId)
        const family = await Family.findById(user.familyId)

        const bills =  family.bills.filter(bill => bill._id != id)
        family.bills = bills
        await family.save()
        return res.status(200).json({message: "Bill Deleted successfully", family})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}
module.exports = {createFamily, joinFamily, createBill, deleteBill}