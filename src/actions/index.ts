import {Task, TaskStatus} from "../types/task";
import {ThunkDispatch} from "redux-thunk";
import * as api from '../api';

interface CreateTask {
    type:'CREATE_TASK',
    payload: {
        id:number;
        title:string;
        description:string,
        status:TaskStatus
    }
}

interface EditTask {
    type:'EDIT_TASK',
    payload: {
        id:number;
        title?:string;
        description?:string,
        status:TaskStatus
    }
}

interface FetchTaskSucceed {
    type:'FETCH_TASKS_SUCCEEDED',
    payload:{
        tasks:Task[]
    }
}

interface CreateTaskSucceeded {
    type:"CREATE_TASK_SUCCEEDED",
    payload:{
        task:Task
    }
}

export type TaskActionType = 'CREATE_TASK' | 'EDIT_TASK'|'FETCH_TASKS_SUCCEEDED'

export type TaskActions = CreateTask|EditTask|FetchTaskSucceed|CreateTaskSucceeded

let _id = 1;

export const uniqueId = () => {
    return _id++;
}

const editTask = (id:number,{status}:{status:TaskStatus}):EditTask=>{
    return {
        type:'EDIT_TASK',
        payload:{
            id,
            status
        }
    }
}

const fetchTasksSucceeded = (tasks:Task[]):FetchTaskSucceed=>{
    return{
        type:'FETCH_TASKS_SUCCEEDED',
        payload:{
            tasks
        }
    }
}

const fetchTasks = ()=>{
    return (dispatch:ThunkDispatch<any, any, TaskActions>) =>{
        api.fetchTasks()
            .then(resp=>{
                dispatch(fetchTasksSucceeded(resp.data));
            })
    }
}

const createTaskSucceeded = (task:Task):CreateTaskSucceeded=>{
    return {
        type:"CREATE_TASK_SUCCEEDED",
        payload:{
            task,
        }
    }
}

const createTask = ({title,description,status='UnStarted'}:{title:string,description:string,status?:TaskStatus})=>{
    return (dispatch:ThunkDispatch<any, any, TaskActions>)=>{
        api.createTask({title,description,status}).then(resp=>{
            dispatch(createTaskSucceeded(resp.data))
        })
    }
}

export {
    createTask,
    editTask,
    fetchTasks
}