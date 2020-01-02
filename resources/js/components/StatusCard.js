import React from 'react'
import { Link } from 'react-router-dom'

const StatusCard = ({ status }) => {
    const { name, text, number, type, fa } = status

    return (
        <div className="card">
            <div className="clearfix p-3 card-body">
                <i className={`fa ${fa} bg-${type} p-3 font-2xl mr-3 float-left`}></i>
                <div className={`h5 mb-0 text-${type} mt-2`}>{number}</div>
                <div className="text-muted text-uppercase font-weight-bold font-xs">{text}</div>
            </div>
            <div className="px-3 py-2 card-footer">
                <Link className="font-weight-bold font-xs btn-block text-muted"
                    to={{
                        pathname: '/admin/projects',
                        search: `?status=${name}`
                    }}
                >
                    Xem danh sách<i className="fa fa-angle-right float-right font-lg"></i>
                </Link>
            </div>
        </div>
    )
}

StatusCard.defaultProps = {
    status: {}
}

export default StatusCard
