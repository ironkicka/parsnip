import {Task} from "./task";

type GlobalStore = {
    tasks:MyTaskStore
}

type MyTaskStore = {
    isLoading:boolean;
    tasks:Task[];
    error:string|null;
}

export type{
    GlobalStore,
    MyTaskStore
}