import {TodoListType, FilterValueType, StateType} from "../App";
import {v1} from "uuid";
import {act} from "react-dom/test-utils";
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

export const tasksReducer = (state: StateType, action: ActionType): StateType => {
    let stateCopy = {...state}
    switch (action.type) {
        case "REMOVE-TASK":
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            return stateCopy;
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]]
            return stateCopy
        case "CHANGE-TASK-STATUS":
            return {
                ...stateCopy, [action.todolistId]: [...stateCopy[action.todolistId].map(task => {
                    if (task.id != action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: false}
                    }
                })]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...stateCopy, [action.todolistId]: [...stateCopy[action.todolistId].map(task => {
                    if (task.id != action.taskId) {
                        return task
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
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId: taskId, todolistId: todolistId, isDone: isDone}
}
export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId: taskId, todolistId: todolistId, title: title}
}