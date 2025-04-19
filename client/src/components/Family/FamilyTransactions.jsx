import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import useFamilyStore from '../../stores/useFamilyStore'

const FamilyTransactions = () => {
  const { transactions } = useFamilyStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Sort transactions by date (newest first)
  const sortedTransactions = transactions
    ? [...transactions].sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'))
        const dateB = new Date(b.date.split('-').reverse().join('-'))
        return dateB - dateA
      })
    : []

  // Extract all categories for dropdown
  const allCategories = useMemo(() => {
    const unique = new Set(transactions?.map((t) => t.category))
    return ['All', ...Array.from(unique)]
  }, [transactions])

  // Filtered transactions
  const filteredTransactions = sortedTransactions.filter((t) => {
    const matchSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchCategory = selectedCategory === 'All' || t.category === selectedCategory

    return matchSearch && matchCategory
  })

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors flex items-center gap-1"
          >
            <Plus size={16} />
            Add Transaction
          </motion.button>
        </div>

        {/* Search & Filter UI */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, description, or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {allCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            <p>No transactions match your search</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((el, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:shadow-sm transition-shadow bg-gray-50"
              >
                <div className="space-y-1">
                  <h4 className="text-md font-semibold text-gray-700">{el.description}</h4>
                  <p className="text-sm text-gray-500">
                    By: <span className="font-medium text-gray-700">{el.userId.name}</span>
                  </p>
                  <p className="text-sm text-gray-400">{el.date}</p>
                  <p className="text-sm text-gray-500 italic">{el.category}</p>
                </div>

                <div className="text-right space-y-1">
                  {el.credit !== null ? (
                    <p className="text-green-600 font-semibold text-lg">+ ₹{el.credit.toFixed(2)}</p>
                  ) : (
                    <p className="text-red-500 font-semibold text-lg">- ₹{el.debit.toFixed(2)}</p>
                  )}
                  <p className="text-xs text-gray-400">Balance: ₹{el.balance.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default FamilyTransactions
