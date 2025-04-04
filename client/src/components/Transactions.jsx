import React, { useEffect, useState } from 'react';
import { Search, Filter, Pencil } from 'lucide-react';
import useTransactionStore from '../stores/useTransactionsStore';

const Transactions = () => {
  const { transactions, getTransactions, editTransaction } = useTransactionStore();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  console.log(transactions)
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const handleEditClick = (transaction) => {
    setSelectedTransaction({ ...transaction });
    setOpenPopup(true);
  };

  const handleChange = (e) => {
    setSelectedTransaction({ ...selectedTransaction, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg p-6">
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
                <th className="p-3">Balance</th>
                <th className="p-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b last:border-none">
                  <td className="p-3 text-gray-500">{transaction.date}</td>
                  <td className="p-3 font-medium">{transaction.description}</td>
                  <td className="p-3 text-gray-600">{transaction.category}</td>
                  {transaction.debit ? (
                    <td className='text-red-600 font-semibold'>-{transaction.debit}</td>
                  ) : (
                    <td className='font-semibold text-green-600'>+{transaction.credit}</td>
                  )}
                  <td className="p-3 text-gray-600">{transaction.balance}</td>
                  <td>
                    <button 
                      className='bg-green-500 p-2 rounded-lg text-center text-white font-medium' 
                      onClick={() => handleEditClick(transaction)}
                    > 
                      <Pencil size={20} /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openPopup && selectedTransaction && (
        <div className="edit-popup bg-gray-50/70 absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label className="font-medium">Date</label>
                  <input type="text" name="date" className="border p-2 rounded" value={selectedTransaction.date} onChange={handleChange} />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Name</label>
                  <input type="text" name="description" className="border p-2 rounded" value={selectedTransaction.name} onChange={handleChange}/>
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Category</label>
                  <input type="text" name="category" className="border p-2 rounded" value={selectedTransaction.category} onChange={handleChange} />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Type</label>
                  <select name="type" className="border p-2 rounded" value={selectedTransaction.debit ? "debit" : "credit"} onChange={handleChange}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Amount</label>
                  <input type="number" name="amount" className="border p-2 rounded" value={selectedTransaction.debit || selectedTransaction.credit} onChange={handleChange} />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Balance</label>
                  <input type="number" name="balance" className="border p-2 rounded" value={selectedTransaction.balance} onChange={handleChange} />
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" className="px-4 py-2 border rounded text-gray-700" onClick={() => setOpenPopup(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => editTransaction(selectedTransaction)}>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
