//@ts-check
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/' // via .env
})
export default api;