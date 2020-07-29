import {StateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
}
export type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todolistId: string
    title: string
}


type ActionType = RemoveTaskActionType | AddTaskActionType | changeTaskStatusActionType
    | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: StateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    let stateCopy = {...state}
    switch (action.type) {
        case "REMOVE-TASK":
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            return stateCopy;
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...stateCopy[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...stateCopy, [action.todolistId]: [...stateCopy[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return {...task}
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })]
            }
        case "CHANGE-TASK-TITLE":
            debugger
            return {
                ...stateCopy, [action.todolistId]: [...stateCopy[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return {...task}
                    } else {
                        return {...task, title: action.title}
                    }
                })]
            }
        case "ADD-TODOLIST":
            return {...state, [action.id]: []}
        case "REMOVE-TODOLIST":
            delete stateCopy[action.id]
            return stateCopy

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string, ): changeTaskStatusActionType => {
    debugger
    return {type: "CHANGE-TASK-STATUS", taskId: taskId, isDone: isDone, todolistId: todolistId,}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId: taskId, title: title, todolistId: todolistId}
}