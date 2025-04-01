import React from 'react';

const transactions = [
  { id: 1, name: 'Salary', category: 'Income', amount: 1500, type: 'credit' },
  { id: 2, name: 'Groceries', category: 'Food', amount: -200, type: 'debit' },
  { id: 3, name: 'Freelance Work', category: 'Income', amount: 500, type: 'credit' },
  { id: 4, name: 'Electricity Bill', category: 'Utilities', amount: -100, type: 'debit' },
  { id: 5, name: 'Dining Out', category: 'Entertainment', amount: -50, type: 'debit' },
];

const RecentTransactions = () => {
  return (
    <div className="w-80  bg-white border  border-1-gray-300 rounded-xl p-4 max-h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center p-2 border-b last:border-none"
          >
            <div>
              <p className="font-medium">{transaction.name}</p>
              <p className="text-sm text-gray-500">{transaction.category}</p>
            </div>
            <p
              className={`font-semibold ${
                transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
