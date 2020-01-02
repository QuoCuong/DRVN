import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useUserRole = role => {
    const authUserRole = useSelector(state => state.auth.user.role)
    const [isRole, setIsRole] = useState(false)

    useEffect(() => {
        if (authUserRole.name === role)
            return setIsRole(true)
    })

    return isRole
}

export default useUserRole
