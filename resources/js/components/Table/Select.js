import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import useQueryString from '../hooks/useQueryString'
import { withRouter } from 'react-router-dom'

const Select = props => {
    const { label, name, defaultOption, data } = props

    const handleSelectChange = e => {
        const name = e.target.name
        const value = e.target.value
        const path = props.match.url

        const search = useQueryString(props.location.search, {
            [name]: value ? value : undefined,
            page: undefined,
            search: undefined
        })

        props.history.push(`${path}${search !== null ? `?${search}` : ''}`)
    }

    return (
        <label style={{ display: 'inline-block' }} className={props.className}>
            {`${label} `}
            <select
                name={name}
                className="form-control form-control-sm"
                style={{
                    width: 'auto',
                    display: 'inline-block'
                }}
                value={queryString.parse(props.location.search)[name]}
                onChange={handleSelectChange}
            >
                {
                    Object.keys(defaultOption).length ? (
                        <option value={defaultOption.value}>{defaultOption.text}</option>
                    ) : null
                }
                {
                    Object.keys(data).length ? Object.keys(data).map((value, i) => {
                        return (
                            <option key={i} value={value}>
                                {data[value]}
                            </option>
                        )
                    }) : null
                }
            </select>
        </label>
    )
}

Select.defaultProps = {
    defaultOption: {}
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultOption: PropTypes.shape({
        value: PropTypes.string,
        text: PropTypes.string
    }),
    data: PropTypes.object.isRequired
}

export default withRouter(Select)
