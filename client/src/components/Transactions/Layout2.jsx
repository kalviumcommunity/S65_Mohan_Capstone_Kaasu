import { Trash } from 'lucide-react'
import React from 'react'

const Layout2 = ({ transactions, deleteTransaction }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <ul className="space-y-3">
        {transactions.map((el, idx) => (
          <li
            key={idx}
            className={`p-4 rounded-lg flex justify-between items-center ${
              el.credit ? 'bg-green-100' : 'bg-red-100'
            } hover:brightness-95 transition duration-200 shadow-sm`}
          >
            <div>
              <div className="font-medium text-lg">
                ₹{el.credit ? el.credit : el.debit}
              </div>
              <div className="text-sm text-gray-700">
                {el.description || 'No description'}
              </div>
              <div className="text-xs text-gray-500">{el.date}</div>
            </div>
           <button className="ml-4 p-2 bg-red-600 text-white rounded hover:opacity-90 transition" onClick={() => deleteTransaction(el._id)}><Trash size={18}/> </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Layout2
