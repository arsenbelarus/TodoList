import React from "react";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";
import {FilterValueType} from "./AppWithRedux";

type TodolistButtonsPropsType = {
    onAllClickHandler: () => void;
    onActiveClickHandler: () => void;
    onCompletedClickHandler: () => void;
    filter: FilterValueType;
}

export const TodolistButtons = React.memo((props: TodolistButtonsPropsType) => {

    return (
        <div style={{marginTop: "20px", textAlign: "center"}}>
            <Button onClick={props.onAllClickHandler}
                    variant={props.filter === "all" ? "outlined" : "text"}> All </Button>
            <Button onClick={props.onActiveClickHandler}
                    variant={props.filter === "active" ? "outlined" : "text"}> Active </Button>
            <Button onClick={props.onCompletedClickHandler}
                    variant={props.filter === "completed" ? "outlined" : "text"}> Completed </Button>
        </div>
    )
})