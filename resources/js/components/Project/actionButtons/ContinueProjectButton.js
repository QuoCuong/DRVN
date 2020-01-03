import React from 'react'
import { connect } from 'react-redux'
import appActions from '../../../redux/app/actions'
import { withRouter } from 'react-router-dom'
import useUserRole from '../../hooks/useUserRole'
import { resumeProject } from '../../../api/projects'

const ContinueProjectButton = props => {
    const { handleActionCompleted, toggleLoading } = props
    const { id: projectId } = props.match.params
    const acceptRole = 'admin'

    function handleClick() {
        toggleLoading()
        resumeProject(projectId)
            .then(() => {
                handleActionCompleted()
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                toggleLoading()
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

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default withRouter(connect(
    null,
    mapDispatchToProps
)(ContinueProjectButton))
