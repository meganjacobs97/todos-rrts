import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

interface Todo {
    id: number,
    title: string,
    completed: boolean
};

interface FetchTodosAction {
    type: ActionTypes.fetchTodos,
    payload: Todo[]
};

const url = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = () => {
    //make use of redux thunk since this asyncronous 
    return async (dispatch: Dispatch) => {
        //we're getting back a todo array
        const response = await
            axios.get<Todo[]>(url)

        dispatch<FetchTodosAction>({
            type: ActionTypes.fetchTodos,
            payload: response.data
        });
    };
};