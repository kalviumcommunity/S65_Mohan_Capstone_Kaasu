import React from "react";

const RecentTransactions = ({ transactions }) => {
  return (
    <div
      className="w-80 bg-white border border-gray-300 rounded-xl p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
      style={{ height: "auto", maxHeight: "45vh" }}
    >
      <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
      <ul>
        {transactions &&
          transactions.slice(0, 14).map((transaction) => (
            <li
              key={transaction._id}
              className="flex justify-between items-center p-2 border-b last:border-none"
            >
              <div>
                <p className="font-medium">
                  {transaction.description || "N/A"}
                </p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
              {transaction.debit ? (
                <p className="text-red-600 font-semibold">
                  -{transaction.debit}
                </p>
              ) : (
                <p className="font-semibold text-green-600">
                  +{transaction.credit}
                </p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
