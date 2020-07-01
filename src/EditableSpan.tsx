import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onFinalChange: (value: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onFinalChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?  <input value={title} onChange={onChangeHandler} autoFocus onBlur={activateViewMode}/>
        :  <span onDoubleClick={activateEditMode}>{title}</span>

}

export default EditableSpan
