import  {create} from 'zustand'
import axiosInstance from '../utils/axiosInstance'

const useTransactionStore = create((set) => ({
    transactions: null,

    getTransactions: async () => {

        try {
            let res = await axiosInstance.get('/transaction/user')
            console.log(res)
            set({transactions: res.data.transactions})
        } catch (error) {
            console.log(error.message)
        }
    },
    editTransaction: async (transaction) =>  {
        
        try {
            let res = await axiosInstance.put(`/transaction/edit/${transaction._id}`,transaction )
            console.log(res.data)
        } catch (error) {
            console.log(error.message)
        }
    },
    filteredTransactions: (transactions, searchQuery, filters) => {
      try {
        const query = searchQuery.toLowerCase();
    
        return transactions
          .filter((t) => {
            const name = t.description.toLowerCase();
            const category = t.category.toLowerCase();
    
            const matchesQuery =
              query === "" || name.includes(query) || category.includes(query);
    
            const matchesType =
              !filters.type ||
              (filters.type === "debit" && t.debit) ||
              (filters.type === "credit" && t.credit);
    
            const matchesCategory =
              !filters.category ||
              category.includes(filters.category.toLowerCase());
    
            const date = new Date(t.date);
            const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
            const toDate = filters.toDate ? new Date(filters.toDate) : null;
            const matchesDate =
              (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
    
            const amount = t.debit || t.credit || 0;
            const minAmount = filters.minAmount ? parseFloat(filters.minAmount) : null;
            const maxAmount = filters.maxAmount ? parseFloat(filters.maxAmount) : null;
            const matchesAmount =
              (!minAmount || amount >= minAmount) &&
              (!maxAmount || amount <= maxAmount);
    
            return (
              matchesQuery &&
              matchesType &&
              matchesCategory &&
              matchesDate &&
              matchesAmount
            );
          })
          .sort((a, b) => {
            const getRelevance = (str) => {
              if (str === query) return 3;
              if (str.startsWith(query)) return 2;
              if (str.includes(query)) return 1;
              return 0;
            };
    
            const aScore = Math.max(
              getRelevance(a.description.toLowerCase()),
              getRelevance(a.category.toLowerCase())
            );
    
            const bScore = Math.max(
              getRelevance(b.description.toLowerCase()),
              getRelevance(b.category.toLowerCase())
            );
    
            return bScore - aScore;
          });
      } catch (error) {
        console.error(error.message);
        return [];
      }
    }
    
}))

export default useTransactionStore  