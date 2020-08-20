import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'TASKS-API'
}

const todoListId = "a5aec1c7-d822-42ee-8e78-ced093f9e616";
const taskId = "806c24a8-a218-48c2-b105-c1301c4b26a9";


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks(todoListId)
            .then( (res) => {
            setState(res.data.items);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.createTask(todoListId, "Hello")
            .then( (res) => {
            setState(res.data.data.item);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.deleteTask(todoListId, taskId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.updateTask(todoListId, taskId, "I am Front-End Developer")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
