import React from 'react'
import { connect } from 'react-redux'
import Loading from './Loading'

const MainContainer = props => {
    const { loading } = props

    return (
        <main className="main">
            {loading ? <Loading /> : null}
            <div className="container-fluid pt-4">
                <div className="animated fadeIn">
                    {props.children}
                </div>
            </div>
        </main>
    )
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
