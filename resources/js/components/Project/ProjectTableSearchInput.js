import React from 'react'
import { withRouter } from 'react-router-dom'
import useQueryString from '../hooks/useQueryString'

const ProjectTableSearchInput = props => {
    let timeout

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        const path = props.match.url

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            const search = useQueryString(props.location.search, {
                [name]: value ? value : undefined,
                page: undefined
            })

            props.history.push(`${path}${search !== null ? `?${search}` : ''}`)
        }, 1000)
    }

    return (
        <input
            type="search"
            name="search"
            className="form-control form-control-sm"
            placeholder="Tên hoặc địa điểm..."
            style={{
                marginLeft: '0.5em',
                width: 'auto',
                display: 'inline-block'
            }}
            onChange={handleChange.bind(this)}
        />
    )
}

export default withRouter(ProjectTableSearchInput)
