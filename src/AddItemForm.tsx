import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    recommendedTitleLength: number
    maxTitleLength: number
}

const AddItemForm: FC<AddItemFormPropsType> = ({addItem, recommendedTitleLength, maxTitleLength}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength || error
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <span style={{color: "white"}}>Title should be shorter</span>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <span style={{color: "#f23391"}}>Title is too long!!!</span>
    const errorMessage = error &&   "Title is hard required!"
    return (
        <div className={"add-form"}>
            {/*<input*/}
            {/*    placeholder="Enter task title, please"*/}
            {/*    value={title}*/}
            {/*    onChange={setLocalTitleHandler}*/}
            {/*    onKeyDown={onKeyDownAddTaskHandler}*/}
            {/*    className={error ? "input-error" : ""}*/}
            {/*/>*/}
            <TextField
                size={"small"}
                placeholder="Enter task title, please"
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskHandler}
                error={error}
                helperText={errorMessage || longTitleWarningMessage || longTitleErrorMessage}
                // className={error ? "input-error" : ""}
            />
            <button
                disabled={isAddTaskNotPossible}
                onClick={addTaskHandler}
            >+
            </button>
        </div>
    );
};

export default AddItemForm;