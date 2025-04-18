const { default: mongoose } = require("mongoose");
const Family = require("../models/family.model") 
const User = require("../models/user.model")

const createFamily = async (req, res) => {
    try {
        const { name, members } = req.body 
        const uniqueId = () => {
            const dateString = Date.now().toString(36);
            const randomness = Math.random().toString(36).substr(2);
            return dateString + randomness;
          };
        const newFamily = new Family({ name,uniqueCode: uniqueId(), members }) 
        const user = await User.findById(req.user.id)
        user.familyId = newFamily._id
        newFamily.members.push(user._id)
        await newFamily.save() 
        await user.save()
        
        return res.status(201).json({ msg: "Family Created Successfully", newFamily, user }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message }) 
    }
} 


const getFamily = async (req, res) => {
    try {

        const userId = req.user.id
        const user = await User.findById(userId)
        console.log(user)
        const family = await Family.findById(user.familyId).populate("members", "name email balance expenses") 

        if (!family) {
            return res.status(404).json({ msg: "Family Not Found" }) 
        }

        return res.status(200).json({ msg: "Family Found Successfully", family }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message }) 
    }
} 

const joinFamilyMember = async (req,res) => {
    try {
        const {uniqueCode} = req.body
        const userId = req.user.id
        const user = await User.findById(userId)
        const family = await Family.findOne({uniqueCode})
        if (!family.members.includes(userId)) {
            family.members.push(userId) 
            await family.save() 
        }
        user.familyId = family._id
        await user.save()
        return res.status(200).json({ msg: "Family Joined Successfully", family})
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message }) 
    }
}
const addFamilyMember = async (req, res) => {
    try {
        const { userId } = req.body 
        const familyId = req.user.familyId

        const family = await Family.findById(familyId) 
        if (!family) {
            return res.status(404).json({ msg: "Family Not Found" }) 
        }

        if (!family.members.includes(userId)) {
            family.members.push(userId) 
            await family.save() 
        }

        return res.status(200).json({ msg: "Member Added Successfully", family }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message }) 
    }
} 




const removeFamilyMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const familyId = req.user.familyId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ msg: "Family Not Found" });
        }


        family.members = family.members.filter(
            (memberId) => memberId.toString() !== userId
        );


        user.familyId = null;


        await family.save();
        await user.save();

        return res.status(200).json({ msg: "Member Removed Successfully", family });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};



const deleteFamily = async (req, res) => {
    try {
        const { id } = req.params 

        const family = await Family.findByIdAndDelete(id) 
        if (!family) {
            return res.status(404).json({ msg: "Family Not Found" }) 
        }

        return res.status(200).json({ msg: "Family Deleted Successfully", family }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message }) 
    }
} 

module.exports = {
    createFamily,
    getFamily,
    addFamilyMember,
    removeFamilyMember,
    deleteFamily,
    joinFamilyMember
} 
