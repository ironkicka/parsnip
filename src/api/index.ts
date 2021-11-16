import axios from "axios";
import {TaskStatus} from "../types/task";

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

const createTask = (params:{title:string,description:string,status:TaskStatus})=>{
    return client.post('/tasks',params);
}

export {
    fetchTasks,
    createTask
}