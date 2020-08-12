import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, Grid, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

type PropsType = {
    todolistId: string;
    taskId: string;
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
    onFinalChange: (id: string, value: string, todoListId: string) => void;
    removeTask: (id: string, todoListId: string) => void;
    isDone: boolean;
    title: string;
}

export const Task = React.memo((props: PropsType) => {
    const onCheckboxChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.taskId, newIsDoneValue, props.todolistId)
    },
        [props.changeStatus, props.taskId, props.todolistId])
    const changeTaskTitle = useCallback((value: string) => {
        props.onFinalChange(props.taskId, value, props.todolistId)
    }, [props.onFinalChange, props.taskId, props.todolistId])
    return (
        <div key={props.taskId} className={props.isDone ? "is-done" : ""}>
            <Grid container justify={"space-between"}>
                <Grid item>
                    <Checkbox color={"primary"} checked={props.isDone} onChange={onCheckboxChangeHandler}/>
                    <EditableSpan title={props.title} onFinalChange={changeTaskTitle}/>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => {
                        props.removeTask(props.taskId, props.todolistId)
                    }}>
                        <HighlightOffIcon color={"secondary"}/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
})