import React, { useEffect } from 'react';
import { Search, Filter, Pencil } from 'lucide-react';
import useTransactionStore from '../stores/useTransactionsStore';

// const transactions = [
//   { id: 1, name: 'Salary', category: 'Income', amount: 5000, type: 'credit', date: '2025-03-10' },
//   { id: 2, name: 'Groceries', category: 'Food', amount: -250, type: 'debit', date: '2025-03-12' },
//   { id: 3, name: 'Freelance Work', category: 'Income', amount: 1200, type: 'credit', date: '2025-03-15' },
//   { id: 4, name: 'Electricity Bill', category: 'Utilities', amount: -150, type: 'debit', date: '2025-03-18' },
//   { id: 5, name: 'Netflix Subscription', category: 'Entertainment', amount: -15, type: 'debit', date: '2025-03-20' },
// ];

// __v: 0

// _id: "67eba26d86c5c05d470e771f"

// balance: 562.14

// category: "UPI Payment"

// credit: null

// date: "2025-04-02T18:30:00.000Z"

// debit: 20

// description: "UPI/DR/506319266032/WH Smith/YESB/**unjab@ybl/Payment //NEF8551fd53d1fa4cd380705e8ec1eea0d5/04/03/2025 18:31:11"

// familyId: null

// userId: "67e6bb1a451839153be391c1"

// value_date: "04 Mar 2025"


const Transactions = () => {
  const {transactions,getTransactions} = useTransactionStore()
  useEffect(() => {
    getTransactions()
  }, [getTransactions])
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
                <th className="p-3">Balance</th>
                <th className="p-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b last:border-none">
                  <td className="p-3 text-gray-500">{transaction.date}</td>
                  <td className="p-3 font-medium">{transaction.description.split("/")[3]}</td>
                  <td className="p-3 text-gray-600">{transaction.category}</td>
                  {transaction.debit ? (<td className='text-red-600 font-semibold'>-{transaction.debit}</td> ): (<td className='font-semibold text-green-600'>+{transaction.credit}</td> )}
                  {/* <td className={`p-3 font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount)}
                    </td> */}

                    <td className="p-3 text-gray-600">{transaction.balance}</td>
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