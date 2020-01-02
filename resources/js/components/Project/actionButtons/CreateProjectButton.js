import React from 'react'
import { withRouter } from 'react-router-dom'
import useUserRole from '../../hooks/useUserRole'

const CreateProjectButton = props => {
    const acceptRole = 'admin'

    function handleClick() {
        props.history.push(`${props.location.pathname}/create`)
    }

    if (!useUserRole(acceptRole))
        return null

    return (
        <button
            className="btn btn-brand btn-sm btn-success"
            onClick={handleClick.bind(this)}
        >
            <i className="fa fa-plus"></i>
            <span>Thêm công trình</span>
        </button>
    )
}

export default withRouter(CreateProjectButton)
