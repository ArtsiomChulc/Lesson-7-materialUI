import { v1 } from "uuid";
import {FilterValuesType, TodoListType} from "../App";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE_TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE_TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const tdoListReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodo: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodo]
        case "CHANGE_TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE_TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}


export const RemoveTodoListAC = (id: string):RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title: title
    }
}

export const ChangeTDTitleAC =(id: string, title: string):ChangeTodoListTitleAT=>{
    return {
        type: "CHANGE_TODOLIST-TITLE",
        id: id,
        title: title
    }
}

export const ChangeTDFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE_TODOLIST-FILTER",
        id: id,
        filter: filter
    }
}