import {TasksStateType} from '../junk/AppOld';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter((t => t.id != action.taskId))}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, status: action.status} : t)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                return copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)

export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
     todolistsAPI.getTasks(todolistId)
         .then(res => {
             dispatch(setTasksAC(res.data.items, todolistId))
         })
    }
}
export const addTasksTC = (title: string, todolistId: string) => {
    debugger
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                let task = res.data.data.item
                dispatch(addTaskAC(todolistId, task))
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
     todolistsAPI.deleteTask (todolistId, taskId)
         .then(() => {
             dispatch(removeTaskAC(taskId, todolistId))
         })
    }
}
export const updateTaskStatusTC = (taskId: string, todoListId: string, status: TaskStatuses) => {
    debugger
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            todolistsAPI.updateTask(todoListId, taskId, {
                title: task.title,
                status: status,
                description: task.description,
                deadline: task.deadline,
                startDate: task.startDate,
                priority: task.priority
            }).then(() => {
                dispatch(changeTaskStatusAC(taskId, status, todoListId))
            })
        }
    }
}
export const updateTaskTitleTC = (taskId: string, todoListId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            todolistsAPI.updateTask(todoListId, taskId, {
                title: title,
                status: task.status,
                description: task.description,
                deadline: task.deadline,
                startDate: task.startDate,
                priority: task.priority
            }).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(taskId, title, todoListId))
                }
            })
        }
    }
}

