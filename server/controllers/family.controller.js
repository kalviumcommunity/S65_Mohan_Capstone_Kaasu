const Family = require("../models/family.model") 
const User = require("../models/user.model")

const createFamily = async (req, res) => {
    try {
        const { name, members } = req.body 

        const newFamily = new Family({ name, members }) 
        await newFamily.save() 
        members?.forEach(async (id) => {
            const user = await User.findById(id)
            if(user){
                user.familyId = newFamily._id
                await user.save()
            }
        })
        return res.status(201).json({ msg: "Family Created Successfully", newFamily }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message }) 
    }
} 


const getFamily = async (req, res) => {
    try {

        const familyId = req.user.familyId
        const family = await Family.findById(familyId).populate("members", "name email") 

        if (!family) {
            return res.status(404).json({ msg: "Family Not Found" }) 
        }

        return res.status(200).json({ msg: "Family Found Successfully", family }) 
    } catch (error) {
        console.error(error) 
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
        const { userId } = req.body 
        const familyId = req.user.familyId

        const family = await Family.findById(familyId) 
        if (!family) {
            return res.status(404).json({ msg: "Family Not Found" }) 
        }

        family.members = family.members.filter(member => member.toString() !== userId) 
        await family.save() 

        return res.status(200).json({ msg: "Member Removed Successfully", family }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message }) 
    }
} 


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
    deleteFamily
} 
