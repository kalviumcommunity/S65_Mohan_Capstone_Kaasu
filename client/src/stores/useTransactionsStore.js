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
    filteredTransactions: (transactions, searchQuery) => {
        const query = searchQuery.toLowerCase();
    
        return transactions
          .filter((t) => {
            const name = t.description.toLowerCase();
            const category = t.category.toLowerCase();
            return name.includes(query) || category.includes(query);
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
    }
}))

export default useTransactionStore  