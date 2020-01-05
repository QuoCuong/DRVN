import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import appActions from '../../redux/app/actions'
import { getAll } from '../../api/projects'
import Moment from 'react-moment'
import ProjectStatusBadge from '../badges/ProjectStatusBadge'
import Pagination from '../Pagination'
import TableSelect from './TableSelect'
import ProjectTableSearchInput from './ProjectTableSearchInput'

const ProjectTable = props => {
    const [data, setData] = useState({
        projects: {
            data: {}
        },
        statuses: {}
    })
    const orderByData = {
        desc: 'Mới nhất',
        asc: 'Cũ nhất'
    }
    const { search } = props.location
    const { toggleLoading, disableLoading } = props

    useEffect(() => {
        fetchData()

        return () => {
            disableLoading()
        }
    }, [search])

    function fetchData(search = props.location.search) {
        toggleLoading()
        getAll(search)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log(error.response)
            })
            .finally(() => {
                toggleLoading()
            })
    }

    function handleRowClick(id) {
        props.history.push(`/admin/projects/${id}`)
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_length" id="example_length">
                        <TableSelect
                            label="Sắp xếp"
                            name="orderBy"
                            data={orderByData}
                        />
                        <TableSelect
                            className="ml-3"
                            label="Tình trạng"
                            name="status"
                            defaultValue={queryString.parse(search).status}
                            defaultOption={{
                                value: '',
                                text: 'Tất cả'
                            }}
                            data={data.statuses}
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
                            <ProjectTableSearchInput />
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
                        data.projects.data.length ? data.projects.data.map((project, i) => {
                            return (
                                <tr
                                    key={i}
                                    onClick={handleRowClick.bind(this, project.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.location}</td>
                                    <td>
                                        <Moment format="DD-MM-YYYY">
                                            {project.start_date}
                                        </Moment>
                                    </td>
                                    <td>
                                        <ProjectStatusBadge status={project.status} />
                                    </td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </table>
            <Pagination currentPage={data.projects.current_page} lastPage={data.projects.last_page} />
        </Fragment>
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
