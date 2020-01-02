import React from 'react'
import useUserRole from '../../hooks/useUserRole'

const SuspendProjectButton = () => {
    const acceptRole = 'admin'

    function showModal() {
        $('#suspendProjectModal').modal('show')
    }

    if (!useUserRole(acceptRole))
        return null

    return (
        <>
            <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={showModal.bind(this)}
            >
                <i className="fa fa-pause"></i> Tạm dừng
            </button>
        </>
    )
}

export default SuspendProjectButton
