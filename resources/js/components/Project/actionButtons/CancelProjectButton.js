import React from 'react'
import useUserRole from '../../hooks/useUserRole'

const CancelProjectButton = () => {
    const acceptRole = 'admin'

    function showModal() {
        $('#cancelProjectModal').modal('show')
    }

    if (!useUserRole(acceptRole))
        return null

    return (
        <>
            <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={showModal.bind(this)}
            >
                <i className="fa fa-close"></i> Hủy
            </button>
        </>
    )
}

export default CancelProjectButton
