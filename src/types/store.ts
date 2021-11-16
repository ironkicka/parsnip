import {Task} from "./task";

type GlobalStore = {
    tasks:MyTaskStore
}

type MyTaskStore = {
    isLoading:boolean;
    tasks:Task[]
}

export type{
    GlobalStore,
    MyTaskStore
}