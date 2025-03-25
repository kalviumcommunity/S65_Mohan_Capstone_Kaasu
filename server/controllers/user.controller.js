const User = require('../models/user.model')

const signup = async (req,res) => {
    try {
        const {name,email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg: "User Already Exists"})
        }
        const newUser = new User({name, email, password})
        if(!newUser){
            return res.status(400).json({msg: "Failed to Create new User"})
        }
        await newUser.save()
        return res.status(201).json({msg: "New User Created Successfully", newUser})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email, password})
        if(!user){
            return res.status(400).json({msg: "Incorrect Email / Password"})
        } 
        return res.status(200).json({msg: "User Logged In Successfully", user})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const getProfile = async (req,res) => {
    try {
        const {email} = req.body
        const user = await User.find({ email})
        if(!user){
            return res.status(400).json({msg: "User Profile Not found"})
        } 
        return res.status(200).json({msg: "User Profile Found Successfully", user})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const getAllUsers = async(req,res) => {
    try {
        const users =  await User.find()
        if(!users){
            return res.status(400).json({msg: "Users Not found"})
        } 
        return res.status(200).json({msg: "Users Found Successfully", users})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

module.exports = {login, signup, getProfile, getAllUsers}