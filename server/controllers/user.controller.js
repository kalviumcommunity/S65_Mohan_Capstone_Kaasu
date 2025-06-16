const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const { generateToken } = require('../utils/generateToken.js')


exports.register = async (req,res) => {
    try {
        const {username, email, password} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const idx = Math.floor(Math.random() * 100) + 1
        const avatar = `https://avatar.iran.liara.run/public/${idx}`
        const isUserExists = await User.findOne({email})
        if(isUserExists){
            return res.status(400).json({message: "User Already Exists"})
        }
        const newUser = User({username,email,password:hashedPassword, avatar})

        if(!newUser){
            return res.status(400).json({message: "Failed to Register !!"})
        }
        await newUser.save()
        generateToken(newUser, res)
        return res.status(201).json({message: "User registered Successfully", newUser})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        const isAuthenticated = await bcrypt.compare(password, user.password)
        if(!isAuthenticated){
            return res.status(400).json({message: "Login Failed !!", pas:user.password, password})
        }
        generateToken(user, res)
        return res.status(200).json({message: "Login Successfull!!",  user})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

exports.logout = async (req,res) => {
    try {
        res.clearCookie("token", {
            maxAge: 7 * 24 * 60 * 60 * 100,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
        })
        return res.status(200).json({message: "Logout Successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}

exports.getProfile = async (req,res) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId).populate({
            path: "familyId",
            populate: {
                path: "members",
                model: "User"
            }
        })
        if(!user){
            return res.status(404).json({message: "User not Found!!"})
        }
        return res.status(200).json({message: "User found successfully", user})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}