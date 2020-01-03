import React from 'react'
import { connect } from 'react-redux'
import appActions from '../../../redux/app/actions'
import useUserRole from '../../hooks/useUserRole'
import { confirmProgress } from '../../../api/progresses.js'

const ConfirmProgressButton = props => {
    const { progressId, is_complete, confirmed_at, handleActionCompleted, toggleLoading } = props
    const acceptRole = 'supervisor'

    function handleClick() {
        toggleLoading()
        confirmProgress(progressId)
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

    if (!useUserRole(acceptRole) || !is_complete || confirmed_at)
        return null

    return (
        <button
            type="button"
            className="btn-pill btn btn-success btn-sm"
            onClick={handleClick.bind(this)}
        >
            <i className="fa fa-check-circle"></i> Xác nhận
        </button>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(ConfirmProgressButton)
