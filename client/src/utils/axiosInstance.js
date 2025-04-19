import axios from 'axios'

// const axiosInstance = axios("http://localhost:3000/api", {withCredentials: true})
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKED_URL}/api`,
    withCredentials: true
})

export default axiosInstance;
