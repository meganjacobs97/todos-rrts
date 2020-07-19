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

export const deleteTodo = (id: number): DeleteTodoAction => {
    return {
        type: ActionTypes.deleteTodo,
        payload: id
    }
}
