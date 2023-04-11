import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackspaceIcon from '@mui/icons-material/Backspace';

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    let isAllTasksNotIsDone = true // все не выполенные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"


    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(task.id, newTitle, props.todoListId)
        return (
            <ListItem
                key={task.id}
                divider
                // disableGutters={true} // отменяет margin
                disablePadding // отменяет padding
            >
                {/*<input*/}
                {/*    onChange={changeTaskStatus}*/}
                {/*    type="checkbox"*/}
                {/*    checked={task.isDone}*/}
                {/*/>*/}
                <Checkbox
                    color={"secondary"}
                    edge={"start"}
                    onChange={changeTaskStatus}
                    size={"small"}
                    checked={task.isDone}
                />
                <EditableSpan
                    title={task.title}
                    changeTitle={changeTaskTitle}
                    classes={task.isDone ? "task-done" : "task"}
                />

                <IconButton onClick={removeTaskHandler} size={"small"}>
                    <DeleteForeverIcon />
                </IconButton>
            </ListItem>
    )
    })

    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.todoListId)
    return (
        <div className={todoClasses}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <Button
                    onClick={removeTodoList}
                    size={"small"}
                    variant={"contained"}
                    endIcon={<BackspaceIcon/>}
                    sx={{ml: "15px"}}
                >


                    Delete
                </Button>
                {/*<IconButton onClick={removeTodoList}>*/}
                {/*    <BackspaceIcon/>*/}
                {/*</IconButton>*/}
            </h3>
            <AddItemForm
                addItem={addTask}
                recommendedTitleLength={15}
                maxTitleLength={20}
            />
            <List>
                {todoListItems}
            </List>
            <div className={"btn-filter-container"}>
                <Button
                    size={"small"}
                    variant={"contained"}
                    disableElevation={true}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    // className={props.filter === "all" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("all", props.todoListId)
                    }}
                >All
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    disableElevation={true}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    // className={props.filter === "active" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("active", props.todoListId)
                    }}
                >Active
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    disableElevation={true}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    // className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("completed", props.todoListId)
                    }}
                >Completed
                </Button>
            </div>
        </div>
    );
    };

    export default TodoList;