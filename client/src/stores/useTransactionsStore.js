import  {create} from 'zustand'
import axiosInstance from '../utils/axiosInstance'

const useTransactionStore = create((set) => ({
    transactions: null,
    getTransactions: async () => {
        try {
            let res = await axiosInstance.get('/transaction/user')
            set({transactions: res.data.transactions})
        } catch (error) {
            console.log(error.message)
        }
    }
}))

export default useTransactionStore  