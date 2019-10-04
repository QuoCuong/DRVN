import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'
import Aside from './Aside'
import MainContainer from './MainContainer'
import Dashboard from './Dashboard'
import UserList from './User/UserList'
import UserCreate from './User/UserCreate'
import ProjectList from './Project/ProjectList'
import SupervisorProjectList from './Project/SupervisorProjectList'
import ConstructionUnitProjectList from './Project/ConstructionUnitProjectList'

import { fetchAuthUser } from '../actions/authActions'

class App extends Component {
    constructor(props) {
        super(props)
    }

    UNSAFE_componentWillMount() {
        this.props.dispatch(fetchAuthUser())
    }

    componentDidMount() {
        $(".loader").remove();
    }

    render() {
        const path = this.props.match.path
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar />
                    <MainContainer>
                        <Route exact path={`${path}/dashboard`} component={Dashboard} />
                        <Route exact path={`${path}/users`} component={UserList} />
                        <Route exact path={`${path}/users/create`} component={UserCreate} />
                        <Route exact path={`${path}/projects`} component={ProjectList} />
                        <Route exact path={`${path}/projects/supervisor`} component={SupervisorProjectList} />
                        <Route exact path={`${path}/projects/construction_unit`} component={ConstructionUnitProjectList} />
                    </MainContainer>
                    <Aside />
                </div>
            </div>
        );
    }
}

export default connect()(App)
