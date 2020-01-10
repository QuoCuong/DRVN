import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { updateRole } from '../../api/users'
import appActions from '../../redux/app/actions'
import Notification from '../../helpers/Notification'

const RolesDropdownButton = props => {
    const dispatch = useDispatch()
    const [isOpen, setOpen] = useState(false)
    const { userId, roleName, setUser } = props
    const roles = {
        'admin': 'Quản trị viên',
        'supervisor': 'Giám sát viên',
        'construction unit': 'Đơn vị thi công'
    }

    const toggle = () => setOpen(!isOpen)

    const handleClick = role => {
        if (role !== roleName) {
            dispatch(appActions.toggleLoading())
            updateRole(userId, role)
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
    }

    return (
        <ButtonDropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle caret color="primary" size="sm">
                {roles[roleName]}
            </DropdownToggle>
            <DropdownMenu>
                {
                    Object.keys(roles).map(role => {
                        return <DropdownItem key={role} onClick={() => handleClick(role)}>{roles[role]}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </ButtonDropdown>
    )
}

export default RolesDropdownButton
