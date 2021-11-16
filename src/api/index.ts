import axios from "axios";

const API_BASE_URL = 'http://localhost:3002';

const client  = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        'Content-Type':'application/json',
    }
});

const fetchTasks = ()=>{
    return client.get('/tasks')
}

export {
    fetchTasks
}