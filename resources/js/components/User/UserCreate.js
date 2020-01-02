import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createUser } from '../../api/users'
import actions from '../../redux/app/actions'

import Notification from '../../helpers/Notification'

class UserCreate extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <Formik
                            initialValues={{
                                email: '',
                                fullname: '',
                                phone: '',
                                role_id: ''
                            }}

                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email('Email không hợp lệ')
                                    .required('Bắt buộc'),
                                fullname: Yup.string()
                                    .required('Bắt buộc'),
                                phone: Yup.string()
                                    .matches(/(09|03|07|08|05)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
                                    .required('Bắt buộc'),
                                role_id: Yup.number()
                                    .required('Vui lòng chọn ít nhất 1 vai trò')
                            })}

                            onSubmit={(values, actions) => {
                                this.props.toggleLoading()
                                createUser(values)
                                    .then(res => {
                                        Notification.success(res.data.message)
                                        this.props.history.push('/admin/users')
                                    })
                                    .catch(error => {
                                        Notification.error(error.response.data.message)
                                        actions.setErrors(error.response.data.errors)
                                    })
                                    .finally(() => {
                                        this.props.toggleLoading()
                                        actions.setSubmitting(false)
                                    })
                            }}
                        >
                            {({
                                touched,
                                errors,
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                isSubmitting
                            }) => (
                                <Form
                                    className="form-horizontal"
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="card-header">
                                        <i className="fa fa-user-plus"></i> Thêm tài khoản
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label className="require col-md-3 col-form-label">Địa chỉ email</label>
                                            <div className="col-md-9">
                                                <Field
                                                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    placeholder="Địa chỉ email"
                                                    name="email"
                                                />
                                                <ErrorMessage
                                                    className="invalid-feedback"
                                                    name="email"
                                                    component="div"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="require col-md-3 col-form-label">Họ và tên</label>
                                            <div className="col-md-9">
                                                <Field
                                                    className={`form-control ${touched.fullname && errors.fullname ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    placeholder="Họ và tên"
                                                    name="fullname"
                                                />
                                                <ErrorMessage
                                                    className="invalid-feedback"
                                                    name="fullname"
                                                    component="div"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="require col-md-3 col-form-label">Số điện thoại</label>
                                            <div className="col-md-9">
                                                <Field
                                                    className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    placeholder="Số điện thoại"
                                                    name="phone"
                                                />
                                                <ErrorMessage
                                                    className="invalid-feedback"
                                                    name="phone"
                                                    component="div"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="require col-md-3 col-form-label">Vai trò</label>
                                            <div className="col-md-9 col-form-label">
                                                <select
                                                    name="role_id"
                                                    className={`form-control ${touched.role_id && errors.role_id ? 'is-invalid' : ''}`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    defaultValue=""
                                                >
                                                    <option value=""></option>
                                                    <option value="1">Quản trị viên</option>
                                                    <option value="2">Giám sát viên</option>
                                                    <option value="3">Đơn vị thi công</option>
                                                </select>
                                                <ErrorMessage
                                                    className="invalid-feedback"
                                                    name="role_id"
                                                    component="div"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-sm btn-primary" type="submit" disabled={isSubmitting}>
                                            <i className="fa fa-dot-circle-o"></i> Thêm</button>
                                        <button className="btn btn-sm btn-danger" type="reset">
                                            <i className="fa fa-ban"></i> Đặt lại</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(actions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(UserCreate)
