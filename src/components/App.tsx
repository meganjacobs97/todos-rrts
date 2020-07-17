import React from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
    todos: Todo[];
    fetchTodos(): any;

}
class _App extends React.Component<AppProps> {
    onButtonClick = (): void => {
        this.props.fetchTodos();
    }

    renderList(): JSX.Element[] {
        return this.props.todos.map((todo: Todo) => {
            return <div key={todo.id}>{todo.title}</div>
        })
    }

    render() {
        console.log(this.props.todos)
        return <div><button onClick={this.onButtonClick}>Fetch Todos</button>
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
    { fetchTodos }
)(_App);


