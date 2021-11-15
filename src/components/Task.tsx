import {TASK_STATUSES, TaskStatus} from "../types/task";
import React from "react";

const Task = ({task,...props}:{task:{id:number;title:string;description:string;status:TaskStatus},onStatusChange:any})=>{

    const onStatusChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        props.onStatusChange(task.id,e.target.value)
    }

    return(
        <div className={"task"}>
            <div className={"task-header"}>
                <div>{task.title}</div>
                <select
                    value={task.status}
                    onChange={onStatusChange}
                >
                    {TASK_STATUSES.map(status=>(
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <hr/>
            <div className={"task-body"}>{task.description}</div>
        </div>
    )
}

export default Task;