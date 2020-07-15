import React, {ChangeEvent} from "react";
import './App.css';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todoListId: string) => void;
    changeFilter: (value: FilterValueType, todoListId: string) => void;
    addTask: (taskTitle: string, todoListId: string) => void;
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
    removeTodoList: (id: string) => void
    onFinalChange: (id: string, value: string, todoListId: string) => void;
    changeHeaderTitle: (value: string, id: string) => void;
    filter: FilterValueType;
}


function Todolist(props: PropsType) {

    const createTaskTitle = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeHeaderTitle = (value: string) => {
        props.changeHeaderTitle(value, props.id)
    }


    const jsxTasks = props.tasks.map((t: TaskType) => {
        const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id, newIsDoneValue, props.id)
        }
        const changeTaskTitle = (value: string) => {
            props.onFinalChange(t.id, value, props.id)
        }
        return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                <Grid container justify={"space-between"}>
                    <Grid item>
                        <Checkbox color={"primary"} checked={t.isDone} onChange={onCheckboxChangeHandler}/>
                        <EditableSpan title={t.title} onFinalChange={changeTaskTitle}/>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => {
                            props.removeTask(t.id, props.id)
                        }}>
                            <HighlightOffIcon color={"secondary"}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    });

    return (
        <div>
            <div style={{marginBottom: "20px", textAlign: "center"}}>
                <h2 style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    fontSize: "1.5rem",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                    cursor: 'move',
                }}>
                    <EditableSpan title={props.title} onFinalChange={changeHeaderTitle}/>
                    <IconButton onClick={removeTodoList}>
                        <Delete/>
                    </IconButton>
                </h2>
                <AddItemForm addItem={createTaskTitle}/>
            </div>
            <div>
                {jsxTasks}
            </div>
            <div style={{marginTop: "20px", textAlign: "center"}}>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === "all" ? "outlined" : "text"}> All </Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === "active" ? "outlined" : "text"}> Active </Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === "completed" ? "outlined" : "text"}> Completed </Button>
            </div>
        </div>
    );
}

export default Todolist;