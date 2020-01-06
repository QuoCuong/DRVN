import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { supervisors } from '../../api/users'

const SupervisorList = props => {
    const [supervisorList, setSupervisorList] = useState([])
    const { handleRowClick } = props

    useEffect(() => {
        supervisors()
            .then(res => {
                setSupervisorList(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_filter">
                        <label style={{ display: 'inline-block' }}>
                                Tìm kiếm:<input type="search" className="form-control form-control-sm" placeholder="" style={{ marginLeft: '0.5em', width: 'auto', display: 'inline-block' }} />
                        </label>
                    </div>
                </div>
            </div>
            <table id="supervisor" className="table table-responsive-sm table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supervisorList.length ? supervisorList.map((supervisor, i) => {
                            return (
                                <tr key={i}
                                    style={{ cursor: 'pointer' }}
                                    onClick={e => {
                                        $('table#supervisor > tbody > tr').removeClass('bg-success')
                                        $(e.target).closest('tr').addClass('bg-success')
                                        handleRowClick && handleRowClick(supervisor.id)
                                    }}
                                >
                                    <td>{supervisor.id}</td>
                                    <td>{supervisor.fullname}</td>
                                    <td>{supervisor.email}</td>
                                    <td>{supervisor.phone}</td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </table>
        </div>
    )
}

SupervisorList.propTypes = {
    handleRowClick: PropTypes.func
}

export default SupervisorList
