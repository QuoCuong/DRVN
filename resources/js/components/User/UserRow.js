import React, { useState } from 'react'
import Moment from 'react-moment'
import RolesDropdownButton from './RolesDropdownButton'
import UnlockButton from './UnlockButton'
import LockButton from './LockButton'

const UserRow = props => {
    const [user, setUser] = useState(props.user)
    const { id, email, fullname, phone, role, created_at, is_lock } = user

    return (
        <tr>
            <td>{id}</td>
            <td>{email}</td>
            <td>{fullname}</td>
            <td>{phone}</td>
            <td className="text-center">
                <RolesDropdownButton userId={id} roleName={role.name} setUser={setUser} />
            </td>
            <td className="text-center"><Moment format="DD-MM-YYYY HH:mm">{created_at}</Moment></td>
            <td className="text-center">
                {is_lock ? <UnlockButton userId={id} setUser={setUser} /> : <LockButton userId={id} setUser={setUser} />}
            </td>
        </tr>
    )
}

export default UserRow
