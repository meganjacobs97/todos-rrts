import { FetchTodosAction, DeleteTodoAction } from "./todos";

export enum ActionTypes {
    //0 is automatically assigned to this key
    fetchTodos,
    deleteTodo
}

export type Action = FetchTodosAction | DeleteTodoAction; 