import React from 'react'
import useUserRole from '../hooks/useUserRole'

const ToggleEditButton = props => {
    const { isEdit, setEdit, projectStatus } = props
    const acceptRole = 'admin'

    if (!useUserRole(acceptRole) || !projectStatus || ['approved', 'cancelled'].includes(projectStatus))
        return null

    return (
        <>
            {
                !isEdit ? (
                    <button type="button" className="btn btn-sm btn-warning" onClick={() => setEdit(true)}>
                        <i className="fa fa-edit"></i> Sửa
                    </button>
                ) : (
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => setEdit(false)}>
                        <i className="fa fa-close"></i> Hủy
                    </button>
                )
            }
        </>
    )
}

export default ToggleEditButton
