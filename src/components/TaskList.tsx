import Task from "./Task";

const TaskList = ({tasks,status,onStatusChange}:{tasks:any[],status:string,onStatusChange:any})=>{
    return(
        <div className={"task-list"}>
            <div className={"task-list-title"}>
               <strong>{status}</strong>
            </div>
            {tasks.map(task=>(
                <Task
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    )
}

export default TaskList;