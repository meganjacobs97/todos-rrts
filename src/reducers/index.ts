import { combineReducers } from "redux";
import { todosReducer } from "./todos";
import { Todo } from "../actions";

//describe the entire state of the store 
export interface StoreState {
    todos: Todo[];
}

export const reducers = combineReducers<StoreState>({
    todos: todosReducer
})

