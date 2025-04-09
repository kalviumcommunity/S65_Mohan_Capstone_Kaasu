import {create} from 'zustand'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'


const userAuthStore = create( (set) => ({
    user: null,
    isLoginLoading: false,
    isSignupLoading: false,
    isProfileLoading: false,
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
            console.log(res)
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
    },
    getProfile: async () => {
            try {
                set({isProfileLoading: false})
                let res = await axiosInstance.get('/auth/profile')
                console.log(res.data)
                // set({user: res.data})
                set({user: res.data.user})
            }
            catch (err){
                console.log(err.message)
            }
            finally{
                set({isProfileLoading: true})
            }
        },
    logout: async () => {
        try {
            set({isLoginLoading: true})
            let res = await axiosInstance.get('/auth/logout')
            
            toast.success(res.data.msg)
        } catch (error) {
            console.log(error.message)
        }   
        finally{
            set({isLoginLoading: false})
        }
    },
 
}))

export default userAuthStore