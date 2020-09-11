import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    changeTodoListFilterTC, changeTodoListTitleTC, createTodoListsTC,
    FilterValuesType,
    removeTodoListsTC, setTodoListsTC,
    TodolistDomainType
} from "../../state/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTasksTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "../../state/tasks-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "./TodoList/Todolist";
import { Redirect } from "react-router-dom";

export const TodoListsList = () => {

    type TasksStateType = {
        [key: string]: Array<TaskType>
    }
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(setTodoListsTC())
    }, [isLoggedIn])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        debugger
        dispatch(addTasksTC(title, todolistId))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todoListId: string) {
        debugger
        dispatch(updateTaskStatusTC(id, todoListId, status));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTitleTC(id, todolistId, newTitle));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodoListFilterTC(todolistId, value));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodoListsTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodoListTitleTC(title, id));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoListsTC(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px", justifyContent: "center"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={8} style={{justifyContent: "center", marginTop: "20px"}}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "20px", backgroundColor: "#efc700", color: "ivory", boxShadow: "0 0 5px 1px lightgrey"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    entityStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}