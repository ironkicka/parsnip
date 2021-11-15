import React from 'react';
import './App.css';
import TasksPage from "./components/TasksPage";
import {MyStore} from "./types/store";
import {connect, DispatchProp} from 'react-redux';
import {createTask, editTask} from "./actions";
import {TaskStatus} from "./types/task";

function App({tasks,...props}: MyStore & DispatchProp) {

    const onCreateTask = ({title,description}:{title:string,description:string})=>{
        props.dispatch(createTask({title,description}))
    }

    const onStatusChange = (id:number,status:TaskStatus)=>{
        props.dispatch(editTask(id,{status}))
    }

    return (
        <div className={'main-content'}>
            <TasksPage
                tasks={tasks}
                onCreateTask={onCreateTask}
                onStatusChange={onStatusChange}
            />
        </div>
    );
}

const mapStateToProps = (state: MyStore) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(App);
