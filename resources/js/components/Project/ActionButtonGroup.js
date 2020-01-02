import React from 'react'
import PropTypes from 'prop-types'
import StartProjectButton from './actionButtons/StartProjectButton'
import ApproveProjectButton from './actionButtons/ApproveProjectButton'
import ContinueProjectButton from './actionButtons/ContinueProjectButton'
import SuspendProjectButton from './actionButtons/SuspendProjectButton'
import CancelProjectButton from './actionButtons/CancelProjectButton'

const ActionButtonGroup = ({ projectId, projectStatus, handleActionCompleted }) => {
    function renderSwitch() {
        switch (projectStatus) {
        case 'waiting':
            return (
                <>
                    <StartProjectButton handleActionCompleted={handleActionCompleted} projectId={projectId} />
                    <SuspendProjectButton />
                    <CancelProjectButton />
                </>
            )
        case 'under_construction':
            return (
                <>
                    <SuspendProjectButton />
                    <CancelProjectButton />
                </>
            )
        case 'completed':
            return (
                <>
                    <ContinueProjectButton handleActionCompleted={handleActionCompleted} />
                    <ApproveProjectButton handleActionCompleted={handleActionCompleted} />
                </>
            )
        case 'suspended':
            return (
                <>
                    <ContinueProjectButton handleActionCompleted={handleActionCompleted} />
                </>
            )
        case 'cancelled':
            return (
                <>
                </>
            )
        default:
            break
        }
    }

    return (
        <>
            {renderSwitch()}
        </>
    )
}

ActionButtonGroup.propTypes = {
    projectStatus: PropTypes.string
}

export default ActionButtonGroup
