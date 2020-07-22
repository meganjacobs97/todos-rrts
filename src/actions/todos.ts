import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Todo {
    id: number,
    title: string,
    completed: boolean
};

export interface FetchTodosAction {
    type: ActionTypes.fetchTodos,
    payload: Todo[]
};

export interface DeleteTodoAction {
    type: ActionTypes.deleteTodo,
    //id of todo
    payload: number
};

export interface CreateTodoAction {
    type: ActionTypes.createTodo,
    payload: Todo
}

const url = "http://localhost:3001/api/todos/";

export const fetchTodos = () => {
    //make use of redux thunk since this asyncronous 
    return async (dispatch: Dispatch) => {
        //we're getting back a todo array
        const response = await
            axios.get<Todo[]>(url)

        //use interface describe action
        dispatch<FetchTodosAction>({
            type: ActionTypes.fetchTodos,
            payload: response.data
        });
    };
};

export const createTodo = (title: string, content: string) => {
    console.log(title);
    console.log(content);
    return async (dispatch: Dispatch) => {
        const response = await axios.post<Todo>(url, {
            title,
            content,
            completed: false
        })

        dispatch<CreateTodoAction>({
            type: ActionTypes.createTodo,
            payload: response.data
        });
    };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
    return {
        type: ActionTypes.deleteTodo,
        payload: id
    }
}
