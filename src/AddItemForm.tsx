import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

const AddItemForm = React.memo ((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<null | string>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {setError("")};
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
        }
    };
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
        } else {
            setError("Title is required")
        }
        setTitle("");
    };


    return (
        <div onBlur={() => {setError(null)}}>
            <TextField
                variant={"standard"}
                label={"Type your text here"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <AddCircleOutlineIcon />
            </IconButton>

        </div>
    )
})

export default AddItemForm
