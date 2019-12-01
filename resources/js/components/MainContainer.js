import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumb from './Breadcrumb'
import { RotateSpinner } from 'react-spinners-kit'

class MainContainer extends Component {
    render() {
        const { loading } = this.props
        return (
            <main className="main position-relative">
                {
                    loading ? <div className="spinner">
                        <RotateSpinner
                            size={60}
                            color="#54A9D8"
                            loading={loading} />
                    </div> : null
                }
                <Breadcrumb />
                <div className="container-fluid">
                    <div className="animated fadeIn">
                        {this.props.children}
                    </div>
                </div>
            </main>
        );
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
