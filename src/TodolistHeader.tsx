import React from "react";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";

type TodolistHeaderPropsType = {
    title: string;
    changeHeaderTitle: (value: string) => void;
    removeTodoList: () => void;
    createTaskTitle: (title: string) => void;
}

export const TodolistHeader = React.memo((props: TodolistHeaderPropsType) => {

    return (
        <div style={{marginBottom: "20px", textAlign: "center"}}>
            <h2 style={{
                textAlign: "center",
                padding: "0.5rem",
                fontSize: "1.5rem",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                cursor: 'move',
            }}>
                <EditableSpan title={props.title} onFinalChange={props.changeHeaderTitle}/>
                <IconButton onClick={props.removeTodoList}>
                    <Delete/>
                </IconButton>
            </h2>
            <AddItemForm addItem={props.createTaskTitle}/>
        </div>
    )
})