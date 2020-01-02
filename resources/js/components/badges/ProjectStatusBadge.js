import React from 'react'
import useProjectStatuses from '../hooks/useProjectStatuses'

const ProjectStatusBadge = ({ status }) => {
    const listStatus = useProjectStatuses()

    if (status === '')
        return null

    return (
        <span className={`badge badge-${listStatus[status].type}`}>
            {listStatus[status].text}
        </span>
    )
}

ProjectStatusBadge.defaultProps = {
    status: ''
}

export default ProjectStatusBadge
