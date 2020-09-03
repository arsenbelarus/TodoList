import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodoListsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => {
                return {...tl, filter: "all", entityStatus: "idle"}
            })
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todoList: TodolistType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id: id,
    entityStatus
} as const)
export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todoLists} as const)


export const setTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC("idle"))
            })
    }
}
export const createTodoListsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC("idle"))
                } else if (res.data.resultCode === 1) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                    dispatch(setAppStatusAC("idle"))
                }
            })
    }
}
export const removeTodoListsTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(id, "loading"))
        todolistsAPI.deleteTodolist(id)
            .then(res => {
                if (res.data.resultCode === 0)
                    dispatch(removeTodolistAC(id))
                dispatch(setAppStatusAC("idle"))
            })
    }
}
export const changeTodoListTitleTC = (title: string, id: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const todoList = getState().todolists.find(tl => tl.id === id)
        if (todoList) {
            dispatch(setAppStatusAC("loading"))
            todolistsAPI.updateTodolist(id, {
                title,
                id,
                order: todoList.order,
                addedDate: todoList.addedDate,
                filter: todoList.filter,
                entityStatus: "idle"
            })
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTodolistTitleAC(id, title))
                        dispatch(setAppStatusAC("idle"))
                    } else if (res.data.resultCode === 1) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                        dispatch(setAppStatusAC("idle"))
                    }
                })
                .catch
                (error => {
                    dispatch(setAppErrorAC(error.message))
                })
        }
    }
}
export const changeTodoListFilterTC = (id: string, filter: FilterValuesType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const todoList = getState().todolists.find(tl => tl.id === id)
        if (todoList) {
            dispatch(setAppStatusAC("loading"))
            todolistsAPI.updateTodolist(id, {
                id,
                filter,
                addedDate: todoList.addedDate,
                order: todoList.order,
                title: todoList.title,
                entityStatus: "idle"
            })
                .then(res => {
                    if (res.data.resultCode === 0)
                        dispatch(changeTodolistFilterAC(id, filter))
                    dispatch(setAppStatusAC("idle"))
                })
        }
    }
}


