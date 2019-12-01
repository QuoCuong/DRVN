import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { supervisors } from '../../api/users'

class SupervisorList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            supervisors: []
        }
    }

    componentDidMount() {
        supervisors()
            .then(res => {
                this.setState({
                    supervisors: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { supervisors } = this.state
        const { handleRowClick } = this.props

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
                            supervisors.length ? supervisors.map((supervisor, i) => {
                                return (
                                    <tr key={i}
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            $('table#supervisor > tbody > tr').removeClass('bg-success')
                                            $(e.target).closest('tr').addClass('bg-success')
                                            handleRowClick && handleRowClick(supervisor.id)
                                        }}>
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
        );
    }
}

SupervisorList.propTypes = {
    handleRowClick: PropTypes.func
}

const mapStateToProps = state => ({

})

export default connect(
    mapStateToProps
)(SupervisorList)
