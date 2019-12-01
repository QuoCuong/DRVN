import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
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
import ProjectCreate from './Project/ProjectCreate'
import ProjectShow from './Project/ProjectShow'

class App extends Component {
    componentDidMount() {
        $('body').addClass('app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show')
    }

    render() {
        const { path } = this.props.match

        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar />
                    <MainContainer>
                        <Switch>
                            <Route exact path={`${path}/dashboard`} component={Dashboard} />
                            <Route exact path={`${path}/users`} component={UserList} />
                            <Route exact path={`${path}/users/create`} component={UserCreate} />
                            <Route exact path={`${path}/projects`} component={ProjectList} />
                            <Route exact path={`${path}/projects/supervisor`} component={SupervisorProjectList} />
                            <Route exact path={`${path}/projects/construction_unit`} component={ConstructionUnitProjectList} />
                            <Route exact path={`${path}/projects/create`} component={ProjectCreate} />
                            <Route exact path={`${path}/projects/:id`} component={ProjectShow} />
                        </Switch>
                    </MainContainer>
                    <Aside />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
