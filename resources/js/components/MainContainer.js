import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumb from './Breadcrumb'
import Loading from './Loading'

class MainContainer extends Component {
    render() {
        const { loading } = this.props
        return (
            <main className="main">
                {loading ? <Loading /> : null}
                <Breadcrumb />
                <div className="container-fluid">
                    <div className="animated fadeIn">
                        {this.props.children}
                    </div>
                </div>
            </main>
        )
    }
}

MainContainer.defaultProps = {
    loading: false
}

const mapStateToProps = state => ({
    loading: state.app.loading
})

export default connect(
    mapStateToProps
)(MainContainer)
