import React from 'react'
import { withRouter } from 'react-router-dom'
import useQueryString from '../hooks/useQueryString'

const Search = props => {
    const TIMEOUT = 600
    const { placeholder } = props

    let timeout

    const handleChange = e => {
        const { name, value } = e.target
        const path = props.match.url

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            const search = useQueryString(props.location.search, {
                [name]: value ? value : undefined,
                page: undefined
            })

            props.history.push(`${path}${search !== null ? `?${search}` : ''}`)
        }, TIMEOUT)
    }

    return (
        <input
            type="search"
            name="search"
            className="form-control form-control-sm"
            placeholder={placeholder}
            style={{
                marginLeft: '0.5em',
                width: 'auto',
                display: 'inline-block'
            }}
            onChange={handleChange}
        />
    )
}

export default withRouter(Search)
