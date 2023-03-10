import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://todolist-02sh.onrender.com/api'
})
// http://localhost:8080/api
instance.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance