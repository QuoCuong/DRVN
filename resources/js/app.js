/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'
import LoginForm from './components/LoginForm'

if (document.getElementById('app')) {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route exact path="/admin/login" component={LoginForm} />
                    <Route path="/admin" component={App} />
                </Switch>
            </Provider>
        </BrowserRouter>,
        document.getElementById('app')
    )
}
