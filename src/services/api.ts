import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.1.2.71:3333',
});

export default api;