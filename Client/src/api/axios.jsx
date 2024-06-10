import axios from 'axios'
const url = import.meta.env.VITE_BACKEND;

const instance = axios.create({
    baseURL: url || "http://localhost:5000/api",
    timeout: 6000,
    headers: {'Content-Type' : 'application/json'}
  });

export default instance  