import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import RoleAdmin from './RoleAdmin';
import RoleConstructionUnit from './RoleConstructionUnit';
import RoleSupervisor from './RoleSupervisor';

class Sidebar extends Component {
    render() {
        const { path } = this.props.match

        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link
                                to={`${path}/dashboard`}
                                className="nav-link">
                                <i className="nav-icon icon-speedometer"></i> Dashboard
                            </Link>
                        </li>
                        {
                            this.props.roles.length ? this.props.roles.map((role, i) => {
                                switch (role.name) {
                                    case 'admin':
                                        return <RoleAdmin key={i} />
                                    case 'supervisor':
                                        return <RoleSupervisor key={i} />
                                    case 'construction unit':
                                        return <RoleConstructionUnit key={i} />
                                    default:
                                        break;
                                }
                            }) : ''
                        }
                    </ul>
                </nav>
                <button className="sidebar-minimizer brand-minimizer" type="button"></button>
            </div>
        );
    }
}

Sidebar.defaultProps = {
    roles: []
}

const mapStatetoProps = state => ({
    roles: state.auth.user.roles
})

export default withRouter(connect(mapStatetoProps)(Sidebar));
