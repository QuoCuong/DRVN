import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { constructionUnits } from '../../api/users'


class ConstructionUnitList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            constructionUnits: []
        }
    }

    componentDidMount() {
        constructionUnits()
            .then(res => {
                this.setState({
                    constructionUnits: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { constructionUnits } = this.state
        const { handleRowClick } = this.props

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
                            constructionUnits.length ? constructionUnits.map((constructionUnit, i) => {
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
}

ConstructionUnitList.propTypes = {
    handleRowClick: PropTypes.func
}

const mapStateToProps = () => ({

})

export default connect(
    mapStateToProps
)(ConstructionUnitList)
