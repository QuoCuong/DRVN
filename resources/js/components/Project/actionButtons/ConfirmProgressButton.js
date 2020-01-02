import React from 'react'
import useUserRole from '../../hooks/useUserRole'
import { confirmProgress } from '../../../api/progresses.js'

const ConfirmProgressButton = props => {
    const { progressId, is_complete, confirmed_at, handleActionCompleted } = props
    const acceptRole = 'supervisor'

    function handleClick() {
        confirmProgress(progressId)
            .then(() => {
                handleActionCompleted()
            })
            .catch(error => {
                console.log(error)
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

export default ConfirmProgressButton
