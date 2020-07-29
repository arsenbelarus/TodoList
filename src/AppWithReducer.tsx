import React, {useReducer} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Draggable from 'react-draggable'
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValueType = "all" | "active" | "completed";
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
export type StateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    let todoListId1 = v1();
    let todoListId2 = v1();
    let todoListId3 = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListId1, title: "Books", filter: "all"},
        {id: todoListId2, title: "Countries visited", filter: "all"},
        {id: todoListId3, title: "Перезвонить завтра", filter: "all"},
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Italy", isDone: false},
            {id: v1(), title: "Japan", isDone: false},
            {id: v1(), title: "Spain", isDone: false},
            {id: v1(), title: "Poland", isDone: false},
            {id: v1(), title: "Greece", isDone: false},
        ],
        [todoListId3]: [
            {id: v1(), title: "Арсену", isDone: false},
            {id: v1(), title: "Оле", isDone: false},
            {id: v1(), title: "Тиграну", isDone: false},
            {id: v1(), title: "Давиду", isDone: false},
        ],
    });

    function removeTask(id: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(id, todoListId))
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        dispatchToTodoLists(ChangeTodolistFilterAC(value, todoListId))
    }

    function addTask(taskTitle: string, todoListId: string) {
        dispatchToTasks(addTaskAC(taskTitle, todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string ) {
        debugger
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function removeTodoList(id: string) {
        dispatchToTodoLists(removeTodoListAC(id))
        dispatchToTasks(removeTodoListAC(id))
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function onFinalChange(id: string, value: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(id, value, todoListId))
    }

    function changeHeaderTitle(value: string, todoListId: string) {
        dispatchToTodoLists(ChangeTodoListTitleAC(value, todoListId))
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

export default AppWithReducer;
