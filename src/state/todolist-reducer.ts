import {TodoListType, FilterValueType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValueType
    id: string
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const initialState: TodoListType[] = [];

export const todoListReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);

        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList];

        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;

        case 'CHANGE-TODOLIST-FILTER':
            let todoListT = state.find(tl => tl.id === action.id)
            if (todoListT) {
                todoListT.filter = action.filter;
                return [...state]
            }
            return state

        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", id: todoListId}
}
export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: title, id: v1()}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}