import React, {useEffect} from 'react';
import './App.css';
import TasksPage from "./components/TasksPage";
import {GlobalStore, MyTaskStore} from "./types/store";
import {connect} from 'react-redux';
import {createTask, editTask, fetchTasks, TaskActions} from "./actions";
import {TaskStatus} from "./types/task";
import {ThunkDispatch} from "redux-thunk";

function App({isLoading,tasks,dispatch}: MyTaskStore & {dispatch:ThunkDispatch<any, any, TaskActions>}) {

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
                isLoading={isLoading}
            />
        </div>
    );
}

const mapStateToProps = (store: GlobalStore) => {
    const {tasks,isLoading}=store.tasks;
    return {tasks,isLoading}
}

export default connect(mapStateToProps)(App);
