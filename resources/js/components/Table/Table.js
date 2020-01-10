import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import appActions from '../../redux/app/actions'
import Select from './Select'
import Search from './Search'
import Pagination from '../Pagination'

const Table = props => {
    const [data, setData] = useState({
        data: {}
    })
    const { search } = props.location
    const { api, toggleLoading, disableLoading, children } = props

    useEffect(() => {
        fetchData()

        return () => {
            disableLoading()
        }
    }, [search])

    const fetchData = (search = props.location.search) => {
        toggleLoading()
        api(search)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log(error.response)
            })
            .finally(() => {
                toggleLoading()
            })
    }

    return (
        <>
            {children(data)}
            <Pagination currentPage={data.current_page} lastPage={data.last_page} />
        </>
    )
}

Table.Select = Select
Table.Search = Search

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading()),
    disableLoading: () => dispatch(appActions.disableLoading())
})

export default withRouter(connect(
    null,
    mapDispatchToProps
)(Table))
