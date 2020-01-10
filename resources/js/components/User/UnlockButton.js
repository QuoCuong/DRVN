import React from 'react'
import { Button } from 'reactstrap'
import { unlockUser } from '../../api/users'
import appActions from '../../redux/app/actions'
import { useDispatch } from 'react-redux'
import Notification from '../../helpers/Notification'

const UnlockButton = ({ userId, setUser }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(appActions.toggleLoading())
        unlockUser(userId)
            .then(res => {
                setUser(res.data.user)
                Notification.success(res.data.message)
            })
            .catch(error => {
                Notification.error(error.response.data.message)
            })
            .finally(() => {
                dispatch(appActions.toggleLoading())
            })
    }

    return (
        <Button className="btn-brand" size="sm" onClick={handleClick}>
            <i className="fa fa-lock"></i>
        </Button>
    )
}

export default UnlockButton
