import {create} from 'zustand'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'

const useFamilyStore = create((set) => ({
    family: null,
    getFamily: async() => {
        try {
            let res = await axiosInstance.get('/family')
            console.log("Family Res", res)
            set({family:res.data.family})
        } catch (error) {
            console.log(error.message)
        }
    },
    createFamily: async(familyName) => {
        try {
            const res = await axiosInstance.post('/family/create', {name: familyName})
            toast.success(`${familyName} Created Successfully !`)
            console.log(res.data)
            set({family: res.data.newFamily})
        } catch (error) {
            console.log(error.message)
        }
    },
    joinFamilyMember: async(uniqueCode) => {
        try {
            const res = await axiosInstance.post('/family/join', {uniqueCode})
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
    }
}))

export default useFamilyStore