const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ msg: "New User Created Successfully", newUser });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Incorrect Username or Password" });

        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (!isAuthenticated) return res.status(400).json({ msg: "Incorrect Username or Password" });

        const token = jwt.sign(
            { id: user._id, familyId: user.familyId, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ msg: "User Logged In Successfully", user });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true });
        return res.status(200).json({ msg: "User Logged Out Successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('familyId');
        if (!user) return res.status(400).json({ msg: "User Profile Not found" });

        return res.status(200).json({ msg: "User Profile Found Successfully", user });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(400).json({ msg: "Users Not found" });

        return res.status(200).json({ msg: "Users Found Successfully", users });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

module.exports = { login, signup, logout, getProfile, checkAuth, getAllUsers };
