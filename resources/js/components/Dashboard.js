import React, { useState, useEffect } from 'react'
import useProjectStatuses from './hooks/useProjectStatuses'
import axios from 'axios'
import StatusCard from './StatusCard'

const Dashboard = () => {
    const [projectStatusCount, setProjectStatusCount] = useState({})
    const statuses = useProjectStatuses()

    useEffect(() => {
        axios.get('/api/admin', {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.token
            }
        }).then(res => {
            setProjectStatusCount(res.data.projectStatusCount)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
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
    )
}

export default Dashboard
