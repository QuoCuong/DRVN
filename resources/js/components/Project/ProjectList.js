import React, { Fragment } from 'react'
import ProjectTable from './ProjectTable'
import CreateProjectButton from './actionButtons/CreateProjectButton'

const ProjectList = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <i className="fa fa-road"></i> Danh sách công
                                trình
                            <div className="card-header-actions">
                                <CreateProjectButton />
                            </div>
                        </div>
                        <div className="card-body">
                            <ProjectTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProjectList
