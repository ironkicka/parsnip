import React, {useEffect} from 'react';
import './App.css';
import TasksPage from "./components/TasksPage";
import {MyStore} from "./types/store";
import {connect, DispatchProp} from 'react-redux';
import {createTask, editTask, fetchTasks, TaskActions} from "./actions";
import {TaskStatus} from "./types/task";
import {ThunkDispatch} from "redux-thunk";

function App({tasks,dispatch}: MyStore & {dispatch:ThunkDispatch<any, any, TaskActions>}) {

    const onCreateTask = ({title,description}:{title:string,description:string})=>{
        dispatch(createTask({title,description}))
    }

    const onStatusChange = (id:number,status:TaskStatus)=>{
        dispatch(editTask(id,{status}))
    }

    useEffect(()=>{
      dispatch(fetchTasks());
    },[])

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
