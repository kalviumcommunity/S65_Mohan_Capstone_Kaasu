import React, { useEffect, useState } from "react";
import { Search, Filter, Pencil } from "lucide-react";
import useTransactionStore from "../stores/useTransactionsStore";

const Transactions = () => {
  const { transactions, getTransactions, editTransaction, filteredTransactions } =
    useTransactionStore();

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "",
    minAmount: "",
    maxAmount: "",
    type: "",
  });

  const maxFilterWidth = 120;
  const filterWidth = 85;

  useEffect(() => {
    getTransactions();
  }, [getTransactions]); 

  const newTransactions = filteredTransactions(transactions, searchQuery, filters);

  const handleEditClick = (transaction) => {
    const amount = transaction.debit || transaction.credit || 0;
    setSelectedTransaction({ ...transaction, amount });
    setOpenPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setSelectedTransaction((prev) => ({
        ...prev,
        debit: value === "debit" ? prev.amount : null,
        credit: value === "credit" ? prev.amount : null,
      }));
    } else if (name === "amount") {
      setSelectedTransaction((prev) => ({
        ...prev,
        amount: value,
        debit: prev.debit !== null ? value : null,
        credit: prev.credit !== null ? value : null,
      }));
    } else {
      setSelectedTransaction((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <Search
                className="absolute right-2 top-2 text-gray-400"
                size={18}
              />
            </div>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 mb-4 rounded shadow-md items-center flex flex-wrap gap-4">
            {[
              {
                label: "Type",
                input: (
                  <select
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
                  >
                    <option value="">All</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                ),
              },
              {
                label: "From Date",
                input: (
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) =>
                      setFilters({ ...filters, fromDate: e.target.value })
                    }
                  />
                ),
              },
              {
                label: "To Date",
                input: (
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) =>
                      setFilters({ ...filters, toDate: e.target.value })
                    }
                  />
                ),
              },
              {
                label: "Category",
                input: (
                  <input
                    type="text"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                  />
                ),
              },
              {
                label: "Min Amount",
                input: (
                  <input
                    type="number"
                    value={filters.minAmount}
                    onChange={(e) =>
                      setFilters({ ...filters, minAmount: e.target.value })
                    }
                  />
                ),
              },
              {
                label: "Max Amount",
                input: (
                  <input
                    type="number"
                    value={filters.maxAmount}
                    onChange={(e) =>
                      setFilters({ ...filters, maxAmount: e.target.value })
                    }
                  />
                ),
              },
            ].map(({ label, input }, i) => (
              <div
                key={i}
                className="flex flex-col flex-1"
                style={{ width: filterWidth, maxWidth: maxFilterWidth }}
              >
                <label>{label}</label>
                {input}
              </div>
            ))}
            <div className="flex flex-col flex-2">
              <button
                onClick={() =>
                  setFilters({
                    fromDate: "",
                    toDate: "",
                    category: "",
                    minAmount: "",
                    maxAmount: "",
                    type: "",
                  })
                }
                className="text-md bg-blue-600 text-white px-3 btn py-1 rounded-lg shadow-md hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

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
              {newTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-b last:border-none">
                  <td className="p-3 text-gray-500">{transaction.date}</td>
                  <td className="p-3 font-medium">{transaction.description}</td>
                  <td className="p-3 text-gray-600">{transaction.category}</td>
                  {transaction.debit ? (
                    <td className="text-red-600 font-semibold">
                      -{transaction.debit}
                    </td>
                  ) : (
                    <td className="font-semibold text-green-600">
                      +{transaction.credit}
                    </td>
                  )}
                  <td className="p-3 text-gray-600">{transaction.balance}</td>
                  <td>
                    <button
                      className="bg-green-500 p-2 rounded-lg text-white"
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
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  editTransaction(selectedTransaction);
                  setOpenPopup(false);
                }}
              >
                <div className="flex flex-col">
                  <label className="font-medium">Date</label>
                  <input
                    type="text"
                    name="date"
                    className="border p-2 rounded"
                    value={selectedTransaction.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Name</label>
                  <input
                    type="text"
                    name="description"
                    className="border p-2 rounded"
                    value={selectedTransaction.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="border p-2 rounded"
                    value={selectedTransaction.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Type</label>
                  <select
                    name="type"
                    className="border p-2 rounded"
                    value={selectedTransaction.debit ? "debit" : "credit"}
                    onChange={handleChange}
                  >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    className="border p-2 rounded"
                    value={selectedTransaction.amount || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Balance</label>
                  <input
                    type="number"
                    name="balance"
                    className="border p-2 rounded"
                    value={selectedTransaction.balance}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded text-gray-700"
                    onClick={() => setOpenPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
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
