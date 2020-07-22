import { FetchTodosAction, DeleteTodoAction, CreateTodoAction } from "./todos";

export enum ActionTypes {
    //0 is automatically assigned to this key
    fetchTodos,
    deleteTodo,
    createTodo
}

export type Action = FetchTodosAction | DeleteTodoAction | CreateTodoAction; 