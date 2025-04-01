import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PlusCircle, UserCircle, MinusCircle, Bell, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const initialBudgets = [
  { id: 1, name: 'Groceries', amount: 300 },
  { id: 2, name: 'Car', amount: 150 },
  { id: 3, name: 'Savings', amount: 500 }
];

const familyMembers = [
  { id: 1, name: 'John', online: true, income: 4000 },
  { id: 2, name: 'Jane', online: false, income: 3500 },
  { id: 3, name: 'Mike', online: true, income: 2500 }
];

const Family = () => {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [newBudget, setNewBudget] = useState({ name: '', amount: '' });
  const [spendModal, setSpendModal] = useState({ isOpen: false, budgetId: null, amount: '', spender: '' });
  const [notifications, setNotifications] = useState([]);

  const totalIncome = familyMembers.reduce((sum, member) => sum + member.income, 0);
  const totalExpenses = initialBudgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSavings = totalIncome - totalExpenses;

  const handleAddBudget = () => {
    if (newBudget.name && newBudget.amount) {
      setBudgets([...budgets, { id: budgets.length + 1, ...newBudget, amount: Number(newBudget.amount) }]);
      setNewBudget({ name: '', amount: '' });
    }
  };

  const openSpendModal = (id) => {
    setSpendModal({ isOpen: true, budgetId: id, amount: '', spender: '' });
  };

  const handleSpend = () => {
    const budget = budgets.find(b => b.id === spendModal.budgetId);
    if (budget) {
      setBudgets(
        budgets.map((b) =>
          b.id === spendModal.budgetId
            ? { ...b, amount: Math.max(0, b.amount - Number(spendModal.amount)) }
            : b
        )
      );
      setNotifications([
        ...notifications,
        { id: notifications.length + 1, message: `${spendModal.spender} spent $${spendModal.amount} on ${budget.name}` }
      ]);
    }
    setSpendModal({ isOpen: false, budgetId: null, amount: '', spender: '' });
  };

  return (
    <div className="min-h-scree">
      <div className="max-w-6xl mx-auto bg-white rounded-lg pt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Family Finance Dashboard</h2>
        
        {/* Family Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg text-blue-800 flex items-center gap-3">
            <DollarSign size={24} />
            <div>
              <p className="text-lg font-semibold">Total Family Balance</p>
              <p className="text-xl font-bold">${totalIncome}</p>
            </div>
          </div>
          <div className="p-4 bg-red-100 rounded-lg text-red-800 flex items-center gap-3">
            <TrendingDown size={24} />
            <div>
              <p className="text-lg font-semibold">Total Expenses</p>
              <p className="text-xl font-bold">${totalExpenses}</p>
            </div>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-green-800 flex items-center gap-3">
            <TrendingUp size={24} />
            <div>
              <p className="text-lg font-semibold">Total Savings</p>
              <p className="text-xl font-bold">${totalSavings}</p>
            </div>
          </div>
        </div>
        {/* Family Members */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Family Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {familyMembers.map(member => (
              <div key={member.id} className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
                <UserCircle className="text-gray-700" size={32} />
                <div>
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-600">Income: ${member.income}</p>
                  <span className={`text-xs font-medium ${member.online ? 'text-green-600' : 'text-red-600'}`}>
                    {member.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Center */}
        <div className="mb-6 p-4 bg-yellow-100 rounded-lg text-yellow-800">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Bell size={20} /> Notification Center
          </h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-600">No notifications yet.</p>
          ) : (
            <ul className="text-sm">
              {notifications.map(notification => (
                <li key={notification.id} className="mb-1">{notification.message}</li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Add New Budget */}
        <div className="flex gap-3 mt-4 mb-6">
          <input
            type="text"
            placeholder="Budget Name"
            value={newBudget.name}
            onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-1/2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-1/4"
          />
          <button
            onClick={handleAddBudget}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2"
          >
            <PlusCircle size={16} /> Add Budget
          </button>
        </div>
        
        {/* Budgets */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Budgets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgets.map(budget => (
              <div key={budget.id} className="p-4 bg-green-100 rounded-lg text-green-800 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{budget.name}</p>
                  <p className="text-lg font-bold">${budget.amount}</p>
                </div>
                <button
                  onClick={() => openSpendModal(budget.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-700 flex items-center gap-2"
                >
                  <MinusCircle size={16} /> Spend
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Family;
