import React, { useState } from 'react'
import useUserRole from '../../hooks/useUserRole'
import { startProject } from '../../../api/projects'

const StartProjectButton = ({ projectId, handleActionCompleted }) => {
    const acceptRole = 'construction unit'
    const [isSubmitting, setSubmitting] = useState(false)

    function handleClick() {
        setSubmitting(true)
        startProject(projectId)
            .then(() => {
                handleActionCompleted('project_info_tab')
            })
            .catch(error => {
                console.log(error)
            })
        setSubmitting(false)
    }

    if (!useUserRole(acceptRole))
        return null

    return (
        <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleClick.bind(this)}
            disabled={isSubmitting}
        >
            Bắt đầu thi công
        </button>
    )
}

export default StartProjectButton
