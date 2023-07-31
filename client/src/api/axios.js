import axios from 'axios'

const axios_ins = axios.create({
    baseURL: 'http://localhost:4000/api/',
    withCredentials: true,
  });
  
  export default axios_ins;