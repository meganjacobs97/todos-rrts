import React, { ChangeEvent, FormEvent, useState } from "react";
import { AppProps } from "../App"
import { IFormObject } from "./TodosPage";
import { Todo } from "../actions";
import { rootCertificates } from "tls";
import { todosReducer } from "../reducers/todos";
import { useParams } from "react-router-dom";
export const TodoPage = (props: AppProps): JSX.Element => {
    const { todoID } = useParams();

    let currTodo: Todo = { id: todoID, title: "", content: "", completed: false };
    for (let i = 0; i < props.todos.length; i++) {
        if (props.todos[i].id === todoID) {
            currTodo = props.todos[i];
        }
    }

    const [formObject, setFormObject] = useState<IFormObject>({ title: currTodo.title, content: currTodo.content });


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
            props.updateTodo(formObject.title, formObject.content);

            //reset 
            setFormObject({ title: "", content: "" });
        }
    }
    return <form onSubmit={onSubmitClick} >
        <input
            onChange={handleInputChange}
            name="title"
            placeholder={currTodo.title}
            value={formObject.title}
        />
        <input
            onChange={handleInputChange}
            name="content"
            placeholder={currTodo.content}
            value={formObject.content}
        />
        <button type="submit" >Save Todo</button>
    </form>
}