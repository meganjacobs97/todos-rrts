import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Todo {
    _id?: number,
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
    //id
    payload: number
};

export interface CreateTodoAction {
    type: ActionTypes.createTodo,
    payload: Todo
}

export interface UpdateTodoAction {
    type: ActionTypes.updateTodo,
    payload: Todo
}

const url = "http://localhost:3001/api/todos/";
const singleTodoUrl = "http://localhost:3001/api/todo/";

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

export const updateTodo = (id: number, update: { [key: string]: string | boolean }) => {
    return async (dispatch: Dispatch) => {
        console.log("here");
        const response = await axios.put<Todo>(singleTodoUrl + id, update)

        dispatch<UpdateTodoAction>({
            type: ActionTypes.updateTodo,
            payload: response.data
        });
    }
}

export const deleteTodo = (id: number) => {
    return async (dispatch: Dispatch) => {
        console.log("here");
        const response = await axios.delete<Todo>(singleTodoUrl + id)

        dispatch<DeleteTodoAction>({
            type: ActionTypes.deleteTodo,
            payload: response.data.id
        });
    }
}
