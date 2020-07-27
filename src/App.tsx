import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo, createTodo, updateTodo } from "./actions";
import { StoreState } from "./reducers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TodosPage } from "./pages/TodosPage";
import { TodoPage } from "./pages/TodoPage";


export interface AppProps {
    todos: Todo[];
    //say function is of type function since its async
    fetchTodos: Function;
    createTodo: Function;
    updateTodo: Function;
    deleteTodo: Function;
}


const _App = (props: AppProps) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {" "}
                    <TodosPage {...props} />
                </Route>
                <Route exact path="/todo/:id">
                    {" "}
                    <TodoPage {...props} />
                </Route>
            </Switch>
        </Router>
    );
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
    return { todos: state.todos };
}

export const App = connect(
    mapStateToProps,
    //action creator 
    { fetchTodos, createTodo, deleteTodo, updateTodo }
)(_App);



