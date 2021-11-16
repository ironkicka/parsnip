import {MyStore} from "../types/store";
import {TaskActions} from "../actions";

const initialState:MyStore = {
    tasks:[]
}

const tasks = (state=initialState,action:TaskActions):MyStore=>{
    switch(action.type){
        case "CREATE_TASK":
            return {tasks:state.tasks.concat(action.payload)}
        case "EDIT_TASK":
            const {payload} = action;
            return {
                tasks:state.tasks.map(task=>{
                    if(task.id===payload.id){
                        const newTask = {...task}
                        newTask.status = payload.status
                        return newTask;
                    }
                    return task;
                })
            }
        case "FETCH_TASKS_SUCCEEDED":
            return {
                tasks:action.payload.tasks
            }
        default:
            return state
    }
}

export default tasks;