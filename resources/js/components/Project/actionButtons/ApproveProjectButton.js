import React from 'react'
import { withRouter } from 'react-router-dom'
import useUserRole from '../../hooks/useUserRole'
import { approveProject } from '../../../api/projects'

const ApproveProjectButton = props => {
    const { handleActionCompleted } = props
    const { id: projectId } = props.match.params
    const acceptRole = 'admin'

    function handleClick() {
        approveProject(projectId)
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
            className="btn btn-primary btn-sm"
            onClick={handleClick.bind(this)}
        >
            <i className="fa fa-thumbs-up"></i> Duyệt
        </button>
    )
}

export default withRouter(ApproveProjectButton)
