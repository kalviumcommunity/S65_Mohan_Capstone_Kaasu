import {create} from 'zustand'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'

const useFamilyStore = create((set) => ({
    family: null,
    createFamily: async(familyName) => {
        try {
            const res = await axiosInstance.post('/family/create', {name: familyName})
            toast.success(`${familyName} Created Successfully !`)
            console.log(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }
}))

export default useFamilyStore