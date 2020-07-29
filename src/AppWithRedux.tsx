import React from 'react';
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

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        dispatch(ChangeTodolistFilterAC(value, todoListId))
    }

    function addTask(taskTitle: string, todoListId: string) {
        dispatch(addTaskAC(taskTitle, todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function removeTodoList(id: string) {
        dispatch(removeTodoListAC(id))
    }

    function addTodoList(title: string) {
        dispatch(AddTodoListAC(title))
    }

    function onFinalChange(id: string, value: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id, value, todoListId))
    }

    function changeHeaderTitle(value: string, todoListId: string) {
        dispatch(ChangeTodoListTitleAC(value, todoListId))
    }

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
                        let tasksForTodoList = tasks[tl.id];
                        if (tl.filter === "active") {
                            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                        }
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
                                        tasks={tasksForTodoList}
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
