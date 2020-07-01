import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={t.isDone} onChange={onCheckboxChangeHandler}/>
                <EditableSpan title={t.title} onFinalChange={changeTaskTitle}/>
                <button onClick={() => {
                    props.removeTask(t.id, props.id)
                }}> remove
                </button>
            </li>
        )
    });

    return (
        <div>
            <h2>
                <EditableSpan title={props.title} onFinalChange={changeHeaderTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h2>
            <AddItemForm addItem={createTaskTitle}/>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === "all" ? "active-filter" : ""}> All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === "active" ? "active-filter" : ""}> Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === "completed" ? "active-filter" : ""}> Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;