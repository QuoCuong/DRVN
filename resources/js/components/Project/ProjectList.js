import React, { Fragment } from 'react'
import ProjectTable from './ProjectTable'

const ProjectList = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <i className="fa fa-road"></i> Danh sách công trình
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
