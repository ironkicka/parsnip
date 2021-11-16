import TaskList from "./TaskList";
import {Task, TASK_STATUSES} from "../types/task";
import React, {useState} from "react";

const initialState = {
    showNewCardForm: false,
    title: '',
    description: ''
}
const TasksPage = ({
                       isLoading,
                       tasks,
                       ...props
                   }: { isLoading: boolean, tasks: Task[], onCreateTask: any, onStatusChange: any }) => {

    const [state, setState] = useState(initialState);

    const toggleForm = () => {
        const newState = {...state}
        newState.showNewCardForm = !state.showNewCardForm
        setState(newState)
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {...state}
        newState.title = e.target.value;
        setState(newState)
    }

    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {...state}
        newState.description = e.target.value;
        setState(newState)
    }

    const onCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onCreateTask({
            title: state.title,
            description: state.description
        })
        resetForm();
    }

    const resetForm = () => {
        setState(initialState)
    }

    const renderTaskList = () => {
        return TASK_STATUSES.map(status => {
            const statusTasks = tasks.filter(task => task.status === status)
            return <TaskList
                key={status}
                status={status}
                tasks={statusTasks}
                onStatusChange={props.onStatusChange}
            />;
        })
    }

    return (
        <>
            {isLoading ?
                <div className={"tasks-loading"}>
                    Loading...
                </div>
                :
                <div className={"tasks"}>
                    <div
                        className={"tasks-header"}
                    >
                        <button
                            className={"button button-default"}
                            onClick={toggleForm}
                        >
                            + New task
                        </button>
                    </div>
                    {state.showNewCardForm && (
                        <form
                            className={"task-list-form"}
                            onSubmit={onCreateTask}
                        >
                            <input
                                type="text"
                                className={"full-width-input"}
                                onChange={onTitleChange}
                                value={state.title}
                                placeholder={"title"}
                            />
                            <input
                                type="text"
                                className={"full-width-input"}
                                onChange={onDescriptionChange}
                                value={state.description}
                                placeholder={"description"}
                            />
                            <button
                                className={"button"}
                                type={"submit"}
                            >
                                Save
                            </button>
                        </form>
                    )}
                    <div className={"task-lists"}>
                        {renderTaskList()}
                    </div>
                </div>
            }
        </>)
}

export default TasksPage;