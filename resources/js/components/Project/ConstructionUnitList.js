import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { constructionUnits } from '../../api/users'

const ConstructionUnitList = props => {
    const [constructionUnitList, setConstructionUnits] = useState([])
    const { handleRowClick } = props

    useEffect(() => {
        constructionUnits()
            .then(res => {
                setConstructionUnits(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_filter">
                        <label style={{ display: 'inline-block' }}>
                                Tìm kiếm:<input type="search" className="form-control form-control-sm" placeholder="" style={{ marginLeft: '0.5em', width: 'auto', display: 'inline-block' }} />
                        </label>
                    </div>
                </div>
            </div>
            <table id="construction_unit" className="table table-responsive-sm table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        constructionUnitList.length ? constructionUnitList.map((constructionUnit, i) => {
                            return (
                                <tr key={i}
                                    style={{ cursor: 'pointer' }}
                                    onClick={e => {
                                        $('table#construction_unit > tbody > tr').removeClass('bg-success')
                                        $(e.target).closest('tr').addClass('bg-success')
                                        handleRowClick && handleRowClick(constructionUnit.id)
                                    }}
                                >
                                    <td>{constructionUnit.id}</td>
                                    <td>{constructionUnit.fullname}</td>
                                    <td>{constructionUnit.email}</td>
                                    <td>{constructionUnit.phone}</td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </table>
        </div>
    )
}

ConstructionUnitList.propTypes = {
    handleRowClick: PropTypes.func
}

export default ConstructionUnitList
