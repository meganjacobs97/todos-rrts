import { Todo, ActionTypes, Action } from "../actions";


export const todosReducer = (state: Todo[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchTodos:
            return action.payload;
        case ActionTypes.deleteTodo:
            return state.filter((todo: Todo) => {
                return todo.id !== action.payload
            });
        case ActionTypes.createTodo:
            state.push(action.payload);
            return state;
        default:
            return state;
    }
}; 
