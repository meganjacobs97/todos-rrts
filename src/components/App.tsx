import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo, createTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
    todos: Todo[];
    //say function is of type function since its async
    fetchTodos: Function;
    createTodo: Function;
    deleteTodo: typeof deleteTodo;
}

// interface AppState {
//     fetching: boolean,
//     formObject: {
//         title: string,
//         content?: string,
//         completed?: boolean
//     };
// }


interface IFormObject {
    title: string,
    content?: string
}
const _App = (props: AppProps) => {
    // Setting our component's initial state
    const [fetching, setFetching] = useState<Boolean>(false);
    const [todos, setTodos] = useState<Todo[]>([])
    const [formObject, setFormObject] = useState<IFormObject>({ title: "", content: "" });

    const onButtonClick = (): void => {
        setFetching(true);
        props.fetchTodos().then(() => {
            setFetching(false);
        });
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    }

    const onSubmitClick = (event: FormEvent<HTMLElement>): void => {
        event.preventDefault();
        if (formObject.title) {
            if (!formObject.content) {
                setFormObject({ ...formObject, content: "" });
            }
            props.createTodo(formObject.title, formObject.content);

            //reset 
            setFormObject({ title: "", content: "" });
        }
    }

    const onDeleteClick = (id: number): void => {
        deleteTodo(id);
    }

    const renderList = (): JSX.Element[] => {
        return props.todos.map((todo: Todo) => {
            return <div key={todo.id}>
                {todo.title}
                <button onClick={() => onDeleteClick(todo.id)}>
                    x
                </button>
            </div>
        })
    }

    return (<div>
        <div>
            <form onSubmit={onSubmitClick}>
                <input
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                    value={formObject.title}
                />
                <input
                    onChange={handleInputChange}
                    name="content"
                    placeholder="Content"
                    value={formObject.content}
                />
                <button type="submit">Submit Todo</button>
            </form>
        </div>
        <button onClick={onButtonClick}>Fetch Todos</button>
        {fetching ? 'LOADING' : null}
        {renderList()}
    </div>
    );


}

// class _App extends React.Component<AppProps, AppState> {
//     constructor(props: AppProps) {
//         super(props);

//         this.state = { fetching: false, formObject: { title: "", content: "", completed: false } };
//     }

//     onButtonClick = (): void => {
//         this.setState({ ...this.state, fetching: true });
//         this.props.fetchTodos();
//     }

//     handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         console.log('here')
//         const { name, value } = event.target;
//         this.setState({ ...this.state, formObject: { ...this.state.formObject, [name]: value } })
//     }

// onSubmitClick = (event: FormEvent): void => {
//     event.preventDefault();
//     if (this.state.formObject.title) {
//         console.log("title", this.state.formObject.title);
//         console.log("content", this.state.formObject.content);
//         console.log("completed", this.state.formObject.completed)
//         // this.props.createTodo(this.state.formObject);
//     }
// }

//     componentDidUpdate(prevProps: AppProps): void {
//         if (!prevProps.todos.length && this.props.todos.length) {
//             this.setState({ fetching: false });
//         }
//     }

//     onDeleteClick = (id: number): void => {
//         this.props.deleteTodo(id);
//     }

//     renderList(): JSX.Element[] {
//         return this.props.todos.map((todo: Todo) => {
//             return <div key={todo.id}>
//                 {todo.title}
//                 <button onClick={() => this.onDeleteClick(todo.id)}>
//                     x
//                 </button>
//             </div>
//         })
//     }

//     render() {
//         console.log(this.props.todos)
//         return <div>
//             <div>
//                 <form onSubmit={() => this.onSubmitClick}>
//                     <input
//                         onChange={() => this.handleInputChange}
//                         name="title"
//                         placeholder="Title (required)"
//                         value={this.state.formObject.title}
//                     />
//                     <input
//                         onChange={() => this.handleInputChange}
//                         name="content"
//                         placeholder="Content"
//                         value={this.state.formObject.content}
//                     />
//                     <button type="submit">Submit Todo</button>
//                 </form>
//             </div>
//             <button onClick={this.onButtonClick}>Fetch Todos</button>
//             {this.state.fetching ? 'LOADING' : null}
//             {this.renderList()}
//         </div>
//     }
// }

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
    return { todos: state.todos };
}

export const App = connect(
    mapStateToProps,
    //action creator 
    { fetchTodos, createTodo, deleteTodo }
)(_App);



