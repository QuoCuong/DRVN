import React from 'react'
import { withRouter } from 'react-router-dom'
import useUserRole from '../../hooks/useUserRole'

const CreateProgressButton = props => {
    const { projectStatus } = props
    const acceptRole = 'construction unit'

    function handleClick() {
        props.history.push(`${props.location.pathname}/progresses/create`)
    }

    if (!useUserRole(acceptRole) || projectStatus !== 'under_construction')
        return null

    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick.bind(this)}
        >
            Báo cáo tiến độ
        </button>
    )
}

export default withRouter(CreateProgressButton)
