import React, { useEffect } from 'react';
import useTransactionStore from '../stores/useTransactionsStore';

const RecentTransactions = () => {
  const { transactions, getTransactions } = useTransactionStore();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="w-80 bg-white border border-gray-300 rounded-xl p-4 max-h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
      <ul>
        {transactions.slice(0, 5).map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center p-2 border-b last:border-none"
          >
            <div>
              <p className="font-medium">{transaction.description?.split("/")[3] || 'N/A'}</p>
              <p className="text-sm text-gray-500">{transaction.category}</p>
            </div>
            {transaction.debit ? (<p className='text-red-600 font-semibold'>-{transaction.debit}</p> ): (<p className='font-semibold text-green-600'>+{transaction.credit}</p> )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
