import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UserProfile extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { email, fullname, phone } = this.props

		return (
			<div>
				<h4>{fullname}</h4>
				<p>
					<i className="fa fa-envelope-square fa-lg"></i>{` ${email}`}
					<br />
					<i className="fa fa-phone-square fa-lg"></i>{` ${phone}`}
				</p>
			</div>
		)
	}
}

UserProfile.propTypes = {
	email: PropTypes.string.isRequired,
	fullname: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
}

export default UserProfile
