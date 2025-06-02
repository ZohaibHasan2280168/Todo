import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.224.96:5000/api', 
});

export default api;
