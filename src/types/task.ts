
const TASK_STATUSES = ['UnStarted','In Progress','Completed'] as const
type TaskStatuses = typeof TASK_STATUSES;
type TaskStatus = TaskStatuses[number]

type Task ={
    id:number;
    title:string,
    description:string,
    status:TaskStatus,
}

export {
    TASK_STATUSES
}

export type{
    Task,
    TaskStatus
}