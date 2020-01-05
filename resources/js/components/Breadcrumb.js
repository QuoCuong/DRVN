import React from 'react'

const Breadcrumb = () => {
    return (
        <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item">
                <a href="#">Admin</a>
            </li>
            <li className="breadcrumb-item active">Dashboard</li>
        </ol>
    )
}

export default Breadcrumb
