import React, {useEffect} from 'react';
import './App.css';
import TasksPage from "./components/TasksPage";
import {GlobalStore, MyTaskStore} from "./types/store";
import {connect} from 'react-redux';
import {createTask, editTask, fetchTasks, TaskActions} from "./actions";
import {TaskStatus} from "./types/task";
import {ThunkDispatch} from "redux-thunk";
import FlashMessage from "./components/FlashMessage";

function App({isLoading,tasks,error,dispatch}: MyTaskStore & {dispatch:ThunkDispatch<any, any, TaskActions>}) {

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
        <div className={"container"}>
            {error && <FlashMessage message={error}/>}
            <div className={'main-content'}>
                <TasksPage
                    tasks={tasks}
                    onCreateTask={onCreateTask}
                    onStatusChange={onStatusChange}
                    isLoading={isLoading}
                />
            </div>
        </div>

    );
}

const mapStateToProps = (store: GlobalStore) => {
    const {tasks,isLoading,error}=store.tasks;
    return {tasks,isLoading,error}
}

export default connect(mapStateToProps)(App);
