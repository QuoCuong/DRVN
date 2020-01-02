import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import queryString from 'query-string'

class Pagination extends Component {
	render() {
		const url = this.props.match.url
		const currentPage = this.props.currentPage
		const lastPage = this.props.lastPage
		const parsed = queryString.parse(this.props.location.search)
		let items = []

		if (lastPage > 1) {
			if (currentPage != 1) {
				items.push(
					<li key={0} className="page-item">
						<Link className="page-link"
							to={{
								pathname: url,
								search: queryString.stringify({ ...parsed, page: currentPage - 1 })
							}}><i className="fa fa-angle-left"></i></Link>
					</li>
				)
			}

			for (let index = 1; index <= lastPage; index++) {
				if (currentPage == index) {
					items.push(
						<li key={index} className="page-item active"><a className="page-link" href="#">{index}</a></li>
					)
				} else {
					items.push(
						<li key={index} className="page-item">
							<Link className="page-link"
								to={{
									pathname: url,
									search: queryString.stringify({ ...parsed, page: index })
								}}>{index}</Link>
						</li>
					)
				}
			}

			if (currentPage != lastPage) {
				items.push(
					<li key={lastPage + 1} className="page-item">
						<Link className="page-link"
							to={{
								pathname: url,
								search: queryString.stringify({ ...parsed, page: currentPage + 1 })
							}}><i className="fa fa-angle-right"></i></Link>
					</li>
				)
			}
		}

		return (
			<Fragment>
				<ul className="pagination justify-content-center">
					{items}
				</ul>
			</Fragment>
		)
	}
}

Pagination.defaultProps = {
	lastPage: 1,
	currentPage: 1,
}

export default withRouter(Pagination)
