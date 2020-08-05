import React, {useCallback} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Draggable from 'react-draggable'
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = "all" | "active" | "completed";
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
export type StateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, StateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch, removeTaskAC])

    const addTask = useCallback((taskTitle: string, todoListId: string) => {
        dispatch(addTaskAC(taskTitle, todoListId))
    }, [dispatch, addTaskAC])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch, changeTaskStatusAC])

    const onFinalChange = useCallback ((id: string, value: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, value, todoListId))
    }, [dispatch, changeTaskTitleAC])

    const changeFilter = useCallback((value: FilterValueType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(value, todoListId))
    }, [dispatch, ChangeTodolistFilterAC])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
    },[dispatch, removeTodoListAC])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
    }, [dispatch, AddTodoListAC])

    const changeHeaderTitle = useCallback ((value: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(value, todoListId))
    }, [dispatch, ChangeTodoListTitleAC])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TODOLIST
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={8} justify={"center"}>
                    {todoLists.map(tl => {
                        let allTodoListsTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Draggable>
                                <Paper style={{
                                    padding: "20px",
                                    marginTop: "30px",
                                    backgroundColor: "lightgrey",
                                    border: "1px solid darkblue"
                                }} elevation={10}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodoListsTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                        onFinalChange={onFinalChange}
                                        changeHeaderTitle={changeHeaderTitle}
                                        filter={tl.filter}/>
                                </Paper>
                            </Draggable>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
