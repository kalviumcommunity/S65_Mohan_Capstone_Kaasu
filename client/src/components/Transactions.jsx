import React from 'react';
import { Search, Filter, Pencil } from 'lucide-react';

const transactions = [
  { id: 1, name: 'Salary', category: 'Income', amount: 5000, type: 'credit', date: '2025-03-10' },
  { id: 2, name: 'Groceries', category: 'Food', amount: -250, type: 'debit', date: '2025-03-12' },
  { id: 3, name: 'Freelance Work', category: 'Income', amount: 1200, type: 'credit', date: '2025-03-15' },
  { id: 4, name: 'Electricity Bill', category: 'Utilities', amount: -150, type: 'debit', date: '2025-03-18' },
  { id: 5, name: 'Netflix Subscription', category: 'Entertainment', amount: -15, type: 'debit', date: '2025-03-20' },
  { id: 1, name: 'Salary', category: 'Income', amount: 5000, type: 'credit', date: '2025-03-10' },
  { id: 2, name: 'Groceries', category: 'Food', amount: -250, type: 'debit', date: '2025-03-12' },
  { id: 3, name: 'Freelance Work', category: 'Income', amount: 1200, type: 'credit', date: '2025-03-15' },
  { id: 4, name: 'Electricity Bill', category: 'Utilities', amount: -150, type: 'debit', date: '2025-03-18' },
  { id: 5, name: 'Netflix Subscription', category: 'Entertainment', amount: -15, type: 'debit', date: '2025-03-20' },
  { id: 1, name: 'Salary', category: 'Income', amount: 5000, type: 'credit', date: '2025-03-10' },
  { id: 2, name: 'Groceries', category: 'Food', amount: -250, type: 'debit', date: '2025-03-12' },
  { id: 3, name: 'Freelance Work', category: 'Income', amount: 1200, type: 'credit', date: '2025-03-15' },
  { id: 4, name: 'Electricity Bill', category: 'Utilities', amount: -150, type: 'debit', date: '2025-03-18' },
  { id: 5, name: 'Netflix Subscription', category: 'Entertainment', amount: -15, type: 'debit', date: '2025-03-20' },
];

const Transactions = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white border border-1-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input type="text" placeholder="Search..." className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              <Search className="absolute right-2 top-2 text-gray-400" size={18} />
            </div>
            <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3">Date</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-none">
                  <td className="p-3 text-gray-500">{transaction.date}</td>
                  <td className="p-3 font-medium">{transaction.name}</td>
                  <td className="p-3 text-gray-600">{transaction.category}</td>
                  <td className={`p-3 font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount)}
                  </td>
                  <td><button className='bg-green-500 p-2 rounded-lg text-center text-white font-medium'> <Pencil size={20}/> </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;