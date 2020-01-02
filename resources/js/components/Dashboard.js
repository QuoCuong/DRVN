import React, { Component, Fragment } from 'react'
import useProjectStatuses from './hooks/useProjectStatuses'
import axios from 'axios'
import StatusCard from './StatusCard'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectStatusCount: {}
        }
    }

    componentDidMount() {
        axios.get('/api/admin', {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.token
            }
        }).then(res => {
            this.setState({
                projectStatusCount: res.data.projectStatusCount
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const statuses = useProjectStatuses()
        const { projectStatusCount } = this.state

        return (
            <Fragment>
                <div className="row">
                    {
                        Object.keys(statuses).length && Object.keys(statuses).map((status, i) => {
                            return (
                                <div key={i} className="col-12 col-sm-6 col-lg-3">
                                    <StatusCard
                                        status={{
                                            ...statuses[status],
                                            number: projectStatusCount[status] ? (projectStatusCount[status].total || 0) : 0
                                        }}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </Fragment>
        )
    }
}

export default Dashboard
