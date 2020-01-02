import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'
import MainContainer from './MainContainer'
import Dashboard from './Dashboard'
import UserList from './User/UserList'
import UserCreate from './User/UserCreate'
import ProjectList from './Project/ProjectList'
import ProjectCreate from './Project/ProjectCreate'
import ProjectShow from './Project/ProjectShow'
import ProgressCreate from './Progress/ProgressCreate'

const App = props => {
    const { path } = props.match

    useEffect(() => {
        $('body').addClass('app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show')
    })

    return (
        <div className="app">
            <Header />
            <div className="app-body">
                <Sidebar />
                <MainContainer>
                    <Switch>
                        <Route exact path={`${path}/dashboard`} component={Dashboard}/>
                        <Route exact path={`${path}/users`} component={UserList} />
                        <Route exact path={`${path}/users/create`} component={UserCreate} />
                        <Route exact path={`${path}/projects`} component={ProjectList} />
                        <Route exact path={`${path}/projects/create`} component={ProjectCreate} />
                        <Route exact path={`${path}/projects/:id`} component={ProjectShow} />
                        <Route exact path={`${path}/projects/:id/progresses/create`} component={ProgressCreate} />
                    </Switch>
                </MainContainer>
            </div>
            <ToastContainer autoClose={3000} />
        </div>
    )
}

export default App
