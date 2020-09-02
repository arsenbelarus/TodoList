import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodoListsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => {return {...tl, filter: "all"}})
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todoList: TodolistType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

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


