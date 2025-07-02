import { Trash } from 'lucide-react'
import React from 'react'

const Layout1 = ({transactions, deleteTransaction}) => {


  const incomeTransactions = transactions.filter((t) => t.credit)
  const spendingTransactions = transactions.filter((t) => t.debit)

  return (
    <div>
    <div className='flex flex-col lg:flex-row gap-6 bg-gray-100 min-h-screen'>
      <TransactionList
        title='Income'
        transactions={incomeTransactions}
        type='credit'
        bgColor='bg-green-100'
        accent='text-green-700'
        deleteTransaction={deleteTransaction}
      />
      <TransactionList
        title='Spendings'
        transactions={spendingTransactions}
        type='debit'
        bgColor='bg-red-100'
        accent='text-red-700'
        deleteTransaction={deleteTransaction}
      />
    </div>
    </div>
  )

  
}

const TransactionList = ({ title, transactions, type, bgColor, accent,deleteTransaction }) => (
  
  <div className='w-full lg:w-1/2 bg-white rounded-xl shadow-md p-6'>
    <h2 className={`text-2xl font-semibold mb-4 ${accent}`}>{title}</h2>
    {transactions.length === 0 ? (
      <p className='text-gray-500 italic'>No {title.toLowerCase()} transactions.</p>
    ) : (
      <ul className='space-y-3'>
        {transactions.map((el, idx) => (
          <li
            key={idx}
            className={`p-4 rounded-lg ${bgColor} flex justify-between items-center hover:brightness-95 transition duration-200 shadow-sm`}
          >
          <div>
              <div className='font-medium text-lg'>₹{el[type]}</div>
            <div className='text-sm text-gray-700'>
              {el.description || 'No description'}
            </div>
            <div className='text-xs text-gray-500'>{el.date}</div>
          </div>
            <button className="ml-4 p-2 bg-red-600 text-white rounded hover:opacity-90 transition" onClick={() => deleteTransaction(el._id)}><Trash size={18}/> </button>
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default Layout1
