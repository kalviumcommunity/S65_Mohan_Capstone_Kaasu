import { create } from 'zustand'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'

const userAuthStore = create((set) => ({
    user: null,
    isLoginLoading: false,
    isSignupLoading: false,
    isProfileLoading: false,

    login: async (email, password) => {
        try {
            set({ isLoginLoading: true });
            const res = await axiosInstance.post('/auth/login', { email, password });
            toast.success('Login successful');
            set({ user: res.data.user });
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Login failed');
            console.error('Login failed:', error.message);
        } finally {
            set({ isLoginLoading: false });
        }
    },

    signup: async (name, email, password) => {
        try {
            set({ isSignupLoading: true });
            const res = await axiosInstance.post('/auth/signup', { name, email, password });
            toast.success('Signup successful');
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Signup failed');
            console.error('Signup failed:', error.message);
        } finally {
            set({ isSignupLoading: false });
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ user: res.data });
        } catch (err) {
            console.error('Auth check failed:', err.message);
            set({ user: null });
        }
    },

    getProfile: async () => {
        try {
            set({ isProfileLoading: true });
            const res = await axiosInstance.get('/auth/profile');
            set({ user: res.data.user });
        } catch (err) {
            toast.error('Failed to fetch profile');
            console.error('Profile fetch failed:', err.message);
        } finally {
            set({ isProfileLoading: false });
        }
    },

    logout: async () => {
        try {
            set({ isLoginLoading: true });
            await axiosInstance.get('/auth/logout');
            set({ user: null });
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Logout failed');
            console.error('Logout failed:', error.message);
        } finally {
            set({ isLoginLoading: false });
        }
    },
}));

export default userAuthStore;
