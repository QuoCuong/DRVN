import React from 'react'
import { withRouter } from 'react-router-dom'
import useUserRole from '../../hooks/useUserRole'
import { resumeProject } from '../../../api/projects'

const ContinueProjectButton = props => {
    const { handleActionCompleted } = props
    const { id: projectId } = props.match.params
    const acceptRole = 'admin'

    function handleClick() {
        resumeProject(projectId)
            .then(() => {
                handleActionCompleted()
            })
            .catch(error => {
                console.log(error)
            })
    }

    if (!useUserRole(acceptRole))
        return null

    return (
        <button
            type="button"
            className="btn btn-warning btn-sm"
            onClick={handleClick.bind(this)}
        >
            <i className="fa fa-play"></i> Tiếp tục
        </button>
    )
}

export default withRouter(ContinueProjectButton)
