import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolist-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todoList: TodolistType,
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodoListsActionType = {
    type: 'SET-TODOLISTS',
    todoLists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoListsActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todoList, filter: "all"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todoLists.map(tl => {
                return {...tl, filter: "all"}
            })
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todoList: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todoList}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodoListsAC = (todoLists: Array<TodolistType>): SetTodoListsActionType => {
    return {type: 'SET-TODOLISTS', todoLists}
}

export const setTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}
export const createTodoListsTC = (title: string) => {
    debugger
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const removeTodoListsTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(id)
            .then(res => {
                if (res.data.resultCode === 0)
                    dispatch(removeTodolistAC(id))
            })
    }
}
export const changeTodoListTitleTC = (title: string, id: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const todoList = getState().todolists.find(tl => tl.id === id)
        if (todoList) {
            todolistsAPI.updateTodolist(id, {title, id, order: todoList.order, addedDate: todoList.addedDate, filter: todoList.filter})
                .then(res => {
                    if (res.data.resultCode === 0)
                        dispatch(changeTodolistTitleAC(id, title))
                })
        }
    }
}
export const changeTodoListFilterTC = (id: string, filter: FilterValuesType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const todoList = getState().todolists.find(tl => tl.id === id)
        if (todoList) {
            todolistsAPI.updateTodolist(id, {id, filter, addedDate: todoList.addedDate, order: todoList.order, title: todoList.title})
                .then(res => {
                    if (res.data.resultCode === 0)
                        dispatch(changeTodolistFilterAC(id, filter))
                })
        }
    }
}


