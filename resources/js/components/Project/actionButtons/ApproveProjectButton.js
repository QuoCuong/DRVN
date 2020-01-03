import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import useUserRole from '../../hooks/useUserRole'
import appActions from '../../../redux/app/actions'
import { approveProject } from '../../../api/projects'

const ApproveProjectButton = props => {
    const { handleActionCompleted, toggleLoading } = props
    const { id: projectId } = props.match.params
    const acceptRole = 'admin'

    function handleClick() {
        toggleLoading()
        approveProject(projectId)
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
            className="btn btn-primary btn-sm"
            onClick={handleClick.bind(this)}
        >
            <i className="fa fa-thumbs-up"></i> Duyệt
        </button>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default withRouter(connect(
    null,
    mapDispatchToProps
)(ApproveProjectButton))
