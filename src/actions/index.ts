import {Task, TaskStatus} from "../types/task";
import {ThunkDispatch} from "redux-thunk";
import * as api from '../api';
import {GlobalStore} from "../types/store";

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

interface EditTaskSucceeded {
    type:'EDIT_TASK_SUCCEEDED',
    payload:{
        task:Task,
    }
}

interface FetchTasksStarted {
    type:'FETCH_TASKS_STARTED'
}

interface FetchTasksFailed {
    type:'FETCH_TASKS_FAILED',
    payload:{
        error:string;
    }
}

// export type TaskActionType = 'CREATE_TASK' | 'EDIT_TASK'|'FETCH_TASKS_SUCCEEDED'

export type TaskActions = |FetchTaskSucceed|CreateTaskSucceeded|EditTaskSucceeded|FetchTasksStarted|FetchTasksFailed

const fetchTasksSucceeded = (tasks:Task[]):FetchTaskSucceed=>{
    return{
        type:'FETCH_TASKS_SUCCEEDED',
        payload:{
            tasks
        }
    }
}

const fetchTasksFailed = (error:string):FetchTasksFailed=>{
    return {
        type:'FETCH_TASKS_FAILED',
        payload:{
            error
        }
    }
}

const fetchTasks = ()=>{
    return (dispatch:ThunkDispatch<any, any, TaskActions>) =>{
        dispatch(fetchTaskStarted());

        api.fetchTasks()
            .then(resp=>{
                // setTimeout(()=>{
                //     dispatch(fetchTasksSucceeded(resp.data));
                // },2000);
                throw new Error('Oh No!! Unable to fetch tasks!!');
            })
            .catch(err=>{
                dispatch(fetchTasksFailed(err.message))
            })
    }
}

const editTaskSucceeded = (task:Task):EditTaskSucceeded=>{
    return {
        type:'EDIT_TASK_SUCCEEDED',
        payload:{
            task,
        }
    }
}

const editTask = (id:number,params={})=>{
    return (dispatch:ThunkDispatch<any,any,TaskActions>,getState:()=>GlobalStore)=>{
        const task = getTaskById(getState().tasks.tasks,id);
        const updatedTask = Object.assign({},task,params);

        api.editTask(id,updatedTask).then(resp=>{
            dispatch(editTaskSucceeded(resp.data));
        })
    }
}

const getTaskById = (tasks:Task[],id:number)=>{
    return tasks.find(task=> task.id ===id)
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

const fetchTaskStarted = ():FetchTasksStarted=>{
    return{
        type:'FETCH_TASKS_STARTED'
    }
}

export {
    createTask,
    editTask,
    fetchTasks
}