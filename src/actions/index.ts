import {TaskStatus} from "../types/task";

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

type TaskActionType = 'CREATE_TASK' | 'EDIT_TASK'

export type TaskActions = CreateTask|EditTask

let _id = 1;

export const uniqueId = () => {
    return _id++;
}
const createTask = ({title, description}: { title: string, description: string }):CreateTask=> {
    return {
        type: 'CREATE_TASK',
        payload: {
            id:uniqueId(),
            title,
            description,
            status:'UnStarted'
        }
    }
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

export {
    createTask,
    editTask
}