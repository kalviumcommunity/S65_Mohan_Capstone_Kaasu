import {create} from 'zustand'
import axiosInstance from '../utils/axiosInstance'


const userAuthStore = create( (set) => ({
    user: null,
    isLoginLoading: false,
    isSignupLoading: false,
    login: async (email, password) => {
        try {
            set({isLoginLoading: true})
            let res = await axiosInstance.post('/auth/login', {email,password})
            console.log(res.data.msg)
            set({user: res.data.user})
        } catch (error) {
            console.log(error.message)
        }   
        finally{
            set({isLoginLoading: false})
        }
    },
    signup: async (name, email, password) => {
        try {
            set({isSignupLoading: true})
            let res = await axiosInstance.post('/auth/signup', {name,email,password})
            console.log(res.data.msg)
        } catch (error) {
            console.log(error.message)
        }   
        finally{
            set({isSignupLoading: false})
        }
    },
    checkAuth: async () => {
        try {
            let res = await axiosInstance.get('/auth/check')
            console.log(res.data)
            set({user: res.data})
        }
        catch (err){
            console.log(err.message)
        }
    }
}))

export default userAuthStore