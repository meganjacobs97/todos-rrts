import React from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
    todos: Todo[];
    //say function is of type function since its async
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;

}

interface AppState {
    fetching: boolean;
}
class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = { fetching: false };
    }

    onButtonClick = (): void => {
        this.setState({ fetching: true });
        this.props.fetchTodos();
    }

    componentDidUpdate(prevProps: AppProps): void {
        if (!prevProps.todos.length && this.props.todos.length) {
            this.setState({ fetching: false });
        }
    }

    onDeleteClick = (id: number): void => {
        this.props.deleteTodo(id);
    }

    renderList(): JSX.Element[] {
        return this.props.todos.map((todo: Todo) => {
            return <div key={todo.id}>
                {todo.title}
                <button onClick={() => this.onDeleteClick(todo.id)}>
                    x
                </button>
            </div>
        })
    }

    render() {
        console.log(this.props.todos)
        return <div>
            <button onClick={this.onButtonClick}>Fetch Todos</button>
            {this.state.fetching ? 'LOADING' : null}
            {this.renderList()}
        </div>
    }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
    return { todos: state.todos };
}

export const App = connect(
    mapStateToProps,
    //action creator 
    { fetchTodos, deleteTodo }
)(_App);



