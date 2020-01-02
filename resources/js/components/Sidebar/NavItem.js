import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavItem = ({ url, children }) => {
    function handleClick(e) {
        $('.sidebar .nav-link').removeClass('active')
        $(e.target).addClass('active')
    }

    return (
        <li className="nav-item">
            <Link
                to={url}
                className="nav-link"
                onClick={handleClick.bind(this)}
            >
                {children}
            </Link>
        </li>
    )
}

NavItem.propTypes = {
    url: PropTypes.string.isRequired
}

export default NavItem
