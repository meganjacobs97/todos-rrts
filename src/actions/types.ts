import { FetchTodosAction, DeleteTodoAction, CreateTodoAction, UpdateTodoAction } from "./todos";

export enum ActionTypes {
    //0 is automatically assigned to this key
    fetchTodos,
    deleteTodo,
    createTodo,
    updateTodo
}

export type Action = FetchTodosAction | DeleteTodoAction | CreateTodoAction | UpdateTodoAction; 