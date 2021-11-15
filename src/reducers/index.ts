import {Task} from "../types/task";
import {MyStore} from "../types/store";
import {TaskActions, uniqueId} from "../actions";

const mockTasks:Task[] = [
    {
        id:uniqueId(),
        title:'Learn Redux',
        description:'The store, actions,and resources, oh my!',
        status:'In Progress',
    },
    {
        id:uniqueId(),
        title:'Peace on Earth',
        description:'No big deal',
        status:'In Progress'
    }
]

const initialState:MyStore = {
    tasks:mockTasks
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
        default:
            return state
    }
}

export default tasks;