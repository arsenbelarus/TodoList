import axios from 'axios'
import {ResponseType} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a318ecb3-f5df-4512-99ed-aabe354d9b6f'
    }
})

type TaskItemType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: Date,
    deadline: Date,
    id: string
    todoListId: string,
    order: number,
    addedDate: Date,
}
type TasksType = {
    items: TaskItemType[],
    totalCount: number,
    error: string | null,
}

export const tasksAPI = {
    getTasks (todoListId: string) {
      return instance.get<TasksType>(`${todoListId}/tasks`)
    },
    createTask (todoListId: string, title: string) {
      return instance.post<ResponseType<{item: TaskItemType}>>(`${todoListId}/tasks`, {title: title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{}>>(`${todoListId}/tasks/${taskId}`, {title: title})
    }
}
