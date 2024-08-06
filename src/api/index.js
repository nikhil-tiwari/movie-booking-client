import axios from 'axios';

export const apiV1Instance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    responseType: 'json',
})

apiV1Instance.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if(token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
})