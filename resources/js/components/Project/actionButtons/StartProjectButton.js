import React, { useState } from 'react'
import { connect } from 'react-redux'
import useUserRole from '../../hooks/useUserRole'
import appActions from '../../../redux/app/actions'
import { startProject } from '../../../api/projects'

const StartProjectButton = props => {
    const { projectId, handleActionCompleted, toggleLoading } = props
    const acceptRole = 'construction unit'
    const [isSubmitting, setSubmitting] = useState(false)


    function handleClick() {
        setSubmitting(true)
        toggleLoading()
        startProject(projectId)
            .then(() => {
                handleActionCompleted('project_info_tab')
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                toggleLoading()
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

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(StartProjectButton)
