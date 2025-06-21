import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: `https://s65-mohan-capstone-kaasu.onrender.com/api`,
    withCredentials: true
})