const Task = ({task}:{task:{title:string,description:string;}})=>{
    return(
        <div className={"task"}>
            <div className={"task-header"}>
                <div>{task.title}</div>
            </div>
            <hr/>
            <div className={"task-body"}>{task.description}</div>
        </div>
    )
}

export default Task;