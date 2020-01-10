import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import appActions from '../../redux/app/actions'
import { getAll } from '../../api/projects'
import Moment from 'react-moment'
import ProjectStatusBadge from '../badges/ProjectStatusBadge'
import Table from '../Table'

const ProjectTable = props => {
    const handleRowClick = id => {
        props.history.push(`/admin/projects/${id}`)
    }

    return (
        <Table api={getAll}>
            {({ data }) => (
                <>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="dataTables_length" id="example_length">
                                <Table.Select
                                    label="Sắp xếp"
                                    name="orderBy"
                                    data={{
                                        desc: 'Mới nhất',
                                        asc: 'Cũ nhất'
                                    }}
                                />
                                <Table.Select
                                    className="ml-3"
                                    label="Tình trạng"
                                    name="status"
                                    defaultOption={{
                                        value: '',
                                        text: 'Tất cả'
                                    }}
                                    data={{
                                        waiting: 'Chờ thi công',
                                        under_construction: 'Đang thi công',
                                        completed: 'Đã hoàn thành',
                                        approved: 'Đã duyệt',
                                        suspended: 'Đã tạm dừng',
                                        cancelled: 'Đã hủy'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="dataTables_filter text-right">
                                <label
                                    style={{
                                        display: 'inline-block'
                                    }}
                                >
                                    Tìm kiếm:
                                    <Table.Search placeholder="Tên hoặc địa điểm..." />
                                </label>
                            </div>
                        </div>
                    </div>
                    <table className="table table-responsive-sm table-striped table-hover">
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
                                data.length ? data.map(project => {
                                    const { id, name, location, start_date, status } = project

                                    return (
                                        <tr
                                            key={id}
                                            onClick={() => handleRowClick(id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>{id}</td>
                                            <td>{name}</td>
                                            <td>{location}</td>
                                            <td>
                                                <Moment format="DD-MM-YYYY">
                                                    {start_date}
                                                </Moment>
                                            </td>
                                            <td>
                                                <ProjectStatusBadge status={status} />
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </>
            )}
        </Table>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading()),
    disableLoading: () => dispatch(appActions.disableLoading())
})

export default withRouter(connect(
    null,
    mapDispatchToProps
)(ProjectTable))
