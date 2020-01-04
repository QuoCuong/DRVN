import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Pagination from '../Pagination'

import appActions from '../../redux/app/actions'

const UserList = props => {
    const [users, setUsers] = useState({
        data: []
    })
    const { search } = props.location
    let roleAlias = []
    roleAlias['admin'] = 'Quản trị viên'
    roleAlias['supervisor'] = 'Giám sát viên'
    roleAlias['construction unit'] = 'Đơn vị thi công'

    useEffect(() => {
        fetchData()
    }, [search])

    const fetchData = () => {
        let url = `/api/admin/users${search}`
        const config = {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.token
            }
        }

        props.toggleLoading()
        axios.get(url, config)
            .then(res => {
                setUsers(res.data)
            })
            .catch(error => {
                console.log(error.response)
            })
            .finally(() => {
                props.toggleLoading()
            })
    }


    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-users"></i> Danh sách tài khoản
                        <div className="card-header-actions">
                            <Link
                                to={`${props.match.path}/create`}
                                className="btn btn-brand btn-sm btn-success"
                            >
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
                                                    <span className="badge badge-success">{roleAlias[user.role.name]}</span>
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
    )
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(UserList)
