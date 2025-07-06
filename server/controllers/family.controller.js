const Family = require('../models/family.model')
const Message = require('../models/message.model')
const User = require('../models/user.model') 
const { generateToken } = require('../utils/generateToken') 

const createFamily = async (req,res) => {
    try {
        const uniqueCode = Math.random().toString(36).toUpperCase().substring(2,7) 
        const {name} = req.body
        const newFamily = new Family({name, uniqueCode, members: [req.user.userId] })
        await newFamily.save()
        const user = await User.findByIdAndUpdate(req.user.userId, {familyId: newFamily._id}, {new: true})
        generateToken(user, res)
        return res.status(201).json({message: "New Family Created", family:newFamily})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}
const joinFamily = async (req, res) => {
  try {
    const { uniqueCode } = req.body 

    let family = await Family.findOne({ uniqueCode }) 
    if (!family) {
      return res.status(404).json({ message: "Family not found" }) 
    }


    if (!family.members.includes(req.user.userId)) {
      family.members.push(req.user.userId) 
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { familyId: family._id },
      { new: true }
    ) 

    generateToken(user, res) 

    await family.save() 


    family = await Family.findById(family._id).populate({path: "members", model: "User"}) 

    return res.status(201).json({ message: "Joined successfully", family }) 
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      desc: error.message,
    }) 
  }
} 


const exitFamily = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId) 
    if (!user) {
      return res.status(404).json({ message: "User not found" }) 
    }

    const family = await Family.findById(user.familyId).populate({
            path: "members",
            model: "User"
        })
    if (!family) {
      return res.status(404).json({ message: "Family not found" }) 
    }


    family.members = family.members.filter(
      member => member._id.toString() !== user._id.toString()
    ) 


    user.familyId = null 

    await user.save() 
    await family.save() 

    return res.status(200).json({ message: "Exited successfully", family }) 
  } catch (error) {
    console.error("Exit Family Error:", error) 
    return res.status(500).json({
      message: "Internal Server Error",
      desc: error.message,
    }) 
  }
} 


const createBill = async(req,res) => {
    try {
        const {name, price, link} = req.body
        const user = await User.findById(req.user.userId)
        const family = await Family.findById(user.familyId).populate({path: "members", model: "User"})
        family.bills.push({name, price, link})
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
        const family = await Family.findById(user.familyId).populate({path: "members", model: "User"})

        const bills =  family.bills.filter(bill => bill._id != id)
        family.bills = bills
        await family.save()
        return res.status(200).json({message: "Bill Deleted successfully", family})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

const addMessage = async (req,res) => {
  try {
    const {msg} = req.body
    const message = new Message({msg, user:req.user.userId, family: req.user.familyId})
    if(!msg){
      return res.status(404).json({msg: "Message Text not provided"})
    }
    await message.save()
    return res.status(201).json({msg: "Message Created Successfully", message})
  } catch (error) {
    return res.status(500).json({message:"Internal Server Error", desc: error.message})
  }
}

const getMessages = async (req,res) => {
try {
  const messages = await Message.find({family: req.user.familyId})
  if(!messages){
    return res.status(404).json({msg: "Messages found successfully"})
  }
  return res.status(200).json({msg:"Messages got successfully", messages})
} catch (error) {
  return res.status(500).json({message:"Internal Server Error", desc: error.message})
}
}
module.exports = {createFamily, joinFamily, createBill, deleteBill, exitFamily, addMessage, getMessages}