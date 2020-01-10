import React from 'react'
import { connect } from 'react-redux'
import appActions from '../../redux/app/actions'
import UserRow from './UserRow'
import Table from '../Table'
import { getAllUser } from '../../api/users'

const UserList = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-users"></i> Danh sách tài khoản
                    </div>
                    <div className="card-body">
                        <Table api={getAllUser}>
                            {({ data }) => (
                                <>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div className="dataTables_length" id="example_length">
                                                <Table.Select
                                                    label="Sắp xếp"
                                                    name="orderBy"
                                                    data={{
                                                        asc: 'Cũ nhất',
                                                        desc: 'Mới nhất'
                                                    }}
                                                />
                                                <Table.Select
                                                    className="ml-3"
                                                    label="Vai trò"
                                                    name="role"
                                                    defaultOption={{
                                                        value: '',
                                                        text: 'Tất cả'
                                                    }}
                                                    data={{
                                                        'admin': 'Quản trị viên',
                                                        'supervisor': 'Giám sát viên',
                                                        'construction unit': 'Đơn vị thi công'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <div className="dataTables_filter text-right">
                                                <label
                                                    style={{
                                                        display: 'inline-block'
                                                    }}
                                                >
                                                    Tìm kiếm:
                                                    <Table.Search placeholder="Email hoặc họ tên..." />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-responsive-sm table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Email</th>
                                                <th>Họ và tên</th>
                                                <th>Số điện thoại</th>
                                                <th className="text-center">Vai trò</th>
                                                <th className="text-center">Ngày tạo</th>
                                                <th className="text-center">Tình trạng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.length ? data.map(user => {
                                                    return <UserRow key={user.id} user={user} />
                                                }) : null
                                            }
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(UserList)
