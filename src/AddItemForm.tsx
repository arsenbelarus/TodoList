import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<null | string>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.charCode === 13) {addItem()} };
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
        } else {
            setError("Title is required")
        }
        setTitle("");
    };


    return (
        <div>
            <input value={title}
                   placeholder={"Type and press Enter"}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? error : ""}
            />
            <button onClick={addItem}>ADD</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

export default AddItemForm
