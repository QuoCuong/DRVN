import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleLoading } from '../../actions/appActions'
import { supervisor } from '../../api/projects'
import Pagination from '../Pagination'

class SupervisorProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: {
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
        this.props.dispatch(toggleLoading())
        supervisor(search)
            .then(res => {
                this.setState({
                    projects: res.data
                })
            })
            .catch(error => {
                console.log(error.response)
            })
            .finally(() => {
                this.props.dispatch(toggleLoading())
            })
    }

    render() {
        const status = {
            waiting: {
                text: 'Chờ thi công',
                type: 'warning'
            },
            under_construction: {
                text: 'Đang thi công',
                type: 'info'
            },
            completed: {
                text: 'Đã hoàn thành',
                type: 'success'
            },
            approved: {
                text: 'Đã duyệt',
                type: 'primary'
            },
            suspended: {
                text: 'Tạm dừng',
                type: 'warning'
            },
            cancelled: {
                text: 'Đã hủy',
                type: 'danger'
            }
        }
        const projects = this.state.projects

        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-road"></i> Danh sách công trình đang giám sát
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="dataTables_length" id="example_length">
                                            <label style={{display: 'inline-block'}}>
                                                Hiển thị <select name="limit" className="form-control form-control-sm" style={{width: 'auto', display: 'inline-block'}}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select> kết quả
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="dataTables_filter" style={{textAlign: 'right'}}>
                                            <label style={{display: 'inline-blocj'}}>
                                                Tìm kiếm:<input type="search" className="form-control form-control-sm" placeholder="" style={{marginLeft: '0.5em', width: 'auto', display: 'inline-block'}} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-responsive-sm table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên công trình</th>
                                            <th>Địa điểm</th>
                                            <th>Ngày thi công</th>
                                            <th>Tình trạng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projects.data.length ? projects.data.map((project, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{project.id}</td>
                                                        <td>{project.name}</td>
                                                        <td>{project.location}</td>
                                                        <td>{project.start_date}</td>
                                                        <td>
                                                            <span className={`badge badge-${status[project.status].type}`}>{status[project.status].text}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : null
                                        }
                                    </tbody>
                                </table>
                                <Pagination currentPage={projects.current_page} lastPage={projects.last_page} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect()(SupervisorProjectList)
