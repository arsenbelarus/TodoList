import React, {ChangeEvent, useCallback} from "react";
import './App.css';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Task} from "./Task";
import {TodolistHeader} from "./TodolistHeader";
import {TodolistButtons} from "./TodolistButtons";

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


const Todolist = React.memo((props: PropsType) => {

    const createTaskTitle = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.removeTodoList, props.id])
    const changeHeaderTitle = useCallback((value: string) => {
        props.changeHeaderTitle(value, props.id)
    }, [props.changeHeaderTitle, props.id])

    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }


    const tasks = tasksForTodoList.map((task: TaskType) => {
        return <Task todolistId={props.id}
                     taskId={task.id}
                     changeStatus={props.changeStatus}
                     onFinalChange={props.onFinalChange}
                     isDone={task.isDone}
                     title={task.title}
                     removeTask={props.removeTask}
                     key={task.id}/>
    });

    return (
        <div>
            <TodolistHeader title={props.title} changeHeaderTitle={changeHeaderTitle}
                            removeTodoList={removeTodoList} createTaskTitle={createTaskTitle}/>
            <div>
                {tasks}
            </div>
            <TodolistButtons onAllClickHandler={onAllClickHandler}
                             onActiveClickHandler={onActiveClickHandler}
                             onCompletedClickHandler={onCompletedClickHandler}
                             filter={props.filter}/>
        </div>
    );
})

export default Todolist;