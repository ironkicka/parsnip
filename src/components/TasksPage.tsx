import TaskList from "./TaskList";
import {TASK_STATUSES} from "../types/task";

const TasksPage =({tasks}:{tasks:any[]})=>{

    const renderTaskList = ()=>{
        return TASK_STATUSES.map(status=>{
            const statusTasks = tasks.filter(task=>task.status===status)
            return <TaskList key={status} status={status} tasks={statusTasks}/>;
        })
    }
    return(
        <div className={"tasks"}>
            <div className={"task-lists"}>
                {renderTaskList()}
            </div>
        </div>
    )
}

export default TasksPage;