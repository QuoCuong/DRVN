import React from 'react'
import { Button } from 'reactstrap'
import { lockUser } from '../../api/users'
import appActions from '../../redux/app/actions'
import { useDispatch } from 'react-redux'
import Notification from '../../helpers/Notification'

const LockButton = ({ userId, setUser }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(appActions.toggleLoading())
        lockUser(userId)
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
        <Button className="btn-facebook btn-brand" size="sm" onClick={handleClick}>
            <i className="fa fa-unlock"></i>
        </Button>
    )
}

export default LockButton
