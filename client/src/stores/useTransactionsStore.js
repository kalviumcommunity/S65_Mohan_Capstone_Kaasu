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
    }
}))

export default useTransactionStore  