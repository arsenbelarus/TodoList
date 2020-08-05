import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onFinalChange: (value: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        if (title.trim()) {
            props.onFinalChange(title)
        } else {
            setTitle(props.title)
        }
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant={"standard"} value={title} onChange={onChangeHandler}
                     autoFocus onBlur={activateViewMode} spellCheck={"false"}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})

export default EditableSpan
