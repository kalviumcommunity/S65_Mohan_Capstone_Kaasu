const Budget = require("../models/budget.model");

const addBudget = async (req, res) => {
    try {
        const userId = req.user.userId 
        const { category, limit, spent } = req.body;

        const newBudget = new Budget({ userId, category, limit, spent });
        await newBudget.save();

        return res.status(201).json({ msg: "Budget Created Successfully", newBudget });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const getBudget = async (req, res) => {
    try {
        const userId = req.user.userId
        const budgets = await Budget.find({ userId });

        if (!budgets.length) {
            return res.status(404).json({ msg: "No Budgets Found" });
        }

        return res.status(200).json({ msg: "Budgets Found Successfully", budgets });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, limit, spent } = req.body; 

        const budget = await Budget.findByIdAndUpdate(
            id,
            { category, limit, spent },
            { new: true } 
        );

        if (!budget) {
            return res.status(404).json({ msg: "Budget Not Found" });
        }

        return res.status(200).json({ msg: "Budget Updated Successfully", budget });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await Budget.findByIdAndDelete(id);

        if (!budget) {
            return res.status(404).json({ msg: "Budget Not Found" });
        }

        return res.status(200).json({ msg: "Budget Deleted Successfully", budget });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", desc: error.message });
    }
};

module.exports = {
    addBudget,
    getBudget,
    updateBudget,
    deleteBudget,
};
