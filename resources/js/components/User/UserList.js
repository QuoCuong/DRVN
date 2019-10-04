import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import config from '../../api/config'
import axios from 'axios'
import Pagination from '../Pagination'

import {
    enableLoading,
    disableLoading
} from '../../actions/appActions'

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {
                data: []
            }
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.fetchData(nextProps.location.search)
    }

    fetchData(search = this.props.location.search) {
        let url = `/api/admin/users${search}`

        this.props.dispatch(enableLoading())
        axios.get(url, config)
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(error => {
                console.log(error.response)
            })
            .finally(() => {
                this.props.dispatch(disableLoading())
            })
    }

    render() {
        const users = this.state.users
        let roleAlias = []
        roleAlias['admin'] = 'Quản trị viên'
        roleAlias['supervisor'] = 'Giám sát viên'
        roleAlias['construction unit'] = 'Đơn vị thi công'

        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-users"></i> Danh sách tài khoản
                                <div className="card-header-actions">
                                    <Link
                                        to={`${this.props.match.path}/create`}
                                        className="btn btn-brand btn-sm btn-success">
                                        <i className="fa fa-user-plus"></i>
                                        <span>Thêm tài khoản</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-responsive-sm table-striped">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Họ và tên</th>
                                            <th>Số điện thoại</th>
                                            <th className="text-center">Vai trò</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.data.length ? users.data.map((user, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{user.email}</td>
                                                        <td>{user.fullname}</td>
                                                        <td>{user.phone}</td>
                                                        <td className="text-center">
                                                            {
                                                                user.roles.map((role, i) => {
                                                                    return <span key={i} className="badge badge-success">{roleAlias[role.name]}</span>
                                                                })
                                                            }
                                                        </td>
                                                        <td>{user.created_at}</td>
                                                    </tr>
                                                )
                                            }) : null
                                        }
                                    </tbody>
                                </table>
                                <Pagination currentPage={users.current_page} lastPage={users.last_page} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect()(UserList)