import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo, createTodo, updateTodo } from "../actions";
import { StoreState } from "../reducers";
import { AppProps } from "../App";
import { todosReducer } from "../reducers/todos";
import { Link } from "react-router-dom";

export interface IFormObject {
    title: string,
    content?: string
}

export const TodosPage = (props: AppProps) => {
    // Setting our component's initial state
    const [fetching, setFetching] = useState<Boolean>(false);
    const [todos, setTodos] = useState<Todo[]>([])
    const [formObject, setFormObject] = useState<IFormObject>({ title: "", content: "" });

    useEffect(() => {
        fetchTodos();
    }, [todos])

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
        props.deleteTodo(id);
    }

    const onCompleteClick = (id: number): void => {
        props.updateTodo(id, { completed: true });

    }

    const renderIncompleteList = (): JSX.Element[] => {
        return props.todos.map((todo: Todo) => {
            if (!todo.completed) {
                return (<div key={todo.id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.content}</p>
                    < button > <Link to={`todo/${todo.id}`}>Edit</Link></button >
                    <button onClick={() => onCompleteClick(todo.id)}>Completed</button>
                    < button onClick={() => onDeleteClick(todo.id)}>x</button>
                </div>)
            }
            else {
                return <div></div>
            }
        })
    }

    const renderCompleteList = (): JSX.Element[] => {
        return props.todos.map((todo: Todo) => {
            if (todo.completed) {
                return <div key={todo.id}>
                    {todo.title}
                    <button onClick={() => onDeleteClick(todo.id)}>x</button>
                </div>
            }
            else {
                return <div></div>
            }
        })
    }

    return (<div>
        <div>
            <form onSubmit={onSubmitClick} >
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
                <button type="submit" >Submit Todo</button>
            </form>
        </div>
        < button onClick={onButtonClick} > Fetch Todos </button>
        {fetching ? 'LOADING' : null}
        <div><h3>Incomplete </h3></div >
        {renderIncompleteList()}
        < div > <h3>Complete </h3></div >
        {renderCompleteList()}
    </div>
    );

}
