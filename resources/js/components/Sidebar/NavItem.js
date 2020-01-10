import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavItem = ({ url, dropdown, icon, name, children, ...rest }) => {
    const handleClick = e => {
        if (!dropdown) {
            $('.sidebar .nav-link').removeClass('active')
            $(e.target).addClass('active')
        }
    }

    return (
        <li className={`nav-item ${dropdown ? 'nav-dropdown open' : ''}`} {...rest}>
            <Link
                to={url ? url : '.'}
                className={`nav-link ${dropdown ? 'nav-dropdown-toggle' : ''}`}
                onClick={handleClick}
            >
                <i className={icon}></i> {name}
            </Link>
            {children}
        </li>
    )
}

NavItem.defaultProps = {
    url: ''
}

NavItem.propTypes = {
    url: PropTypes.string.isRequired
}

export default NavItem
