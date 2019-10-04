import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { createUser } from '../../api/users'
import { toggleLoading } from '../../actions/appActions'

class UserCreate extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <Formik
                                initialValues={{
                                    email: '',
                                    fullname: '',
                                    phone: '',
                                    roles: [false, false, false]
                                }}
                                validate={values => {
                                    let errors = {}

                                    //validate email
                                    if (!values.email) {
                                        errors.email = "Vui lòng nhập email"
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = "Địa chỉ emal không hợp lệ"
                                    }

                                    //validate fullname
                                    if (!values.fullname) {
                                        errors.fullname = "Vui lòng nhập họ và tên"
                                    }

                                    //validate phone
                                    if (!values.phone) {
                                        errors.phone = "Vui lòng nhập số điện thoại"
                                    } else if (!/(09|03|07|08|05)+([0-9]{8})\b/i.test(values.phone)) {
                                        errors.phone = "Số điện thoại không hợp lệ"
                                    }

                                    //validate roles
                                    if (!values.roles.length || (!values.roles[0] && !values.roles[1] && !values.roles[2])) {
                                        errors.roles = "Vui lòng chọn ít nhất 1 vài trò"
                                    }

                                    return errors
                                }}
                                onSubmit={(values, actions) => {
                                    this.props.dispatch(toggleLoading())
                                    createUser(values)
                                        .then(res => {
                                            $.notify({
                                                message: res.data['message']
                                            }, {
                                                type: 'success'
                                            })
                                            this.props.history.push('/admin/users')
                                        })
                                        .catch(error => {
                                            $.notify({
                                                message: error.response.data['message']
                                            }, {
                                                type: 'danger'
                                            })
                                            actions.setErrors(error.response.data['errors'])
                                        })
                                        .finally(() => {
                                            this.props.dispatch(toggleLoading())
                                            actions.setSubmitting(false);
                                        })
                                }}
                            >
                                {({
                                    touched,
                                    errors,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                        <Fragment>
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
                                                                className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                                type="text"
                                                                placeholder="Địa chỉ email"
                                                                name="email" />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="email"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="require col-md-3 col-form-label">Họ và tên</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.fullname && errors.fullname ? "is-invalid" : ""}`}
                                                                type="text"
                                                                placeholder="Họ và tên"
                                                                name="fullname" />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="fullname"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="require col-md-3 col-form-label">Số điện thoại</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                                                                type="text"
                                                                placeholder="Số điện thoại"
                                                                name="phone" />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="phone"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="require col-md-3 col-form-label">Vai trò</label>
                                                        <div className="col-md-9 col-form-label">
                                                            <div className="form-check checkbox">
                                                                <Field
                                                                    className="form-check-input"
                                                                    id="checkRoleAdmin"
                                                                    type="checkbox"
                                                                    name="roles[0]" />
                                                                <label className="form-check-label" htmlFor="checkRoleAdmin">Quản trị viên</label>
                                                            </div>
                                                            <div className="form-check checkbox">
                                                                <Field
                                                                    className="form-check-input"
                                                                    id="checkRoleSupervisor"
                                                                    type="checkbox"
                                                                    name="roles[1]" />
                                                                <label className="form-check-label" htmlFor="checkRoleSupervisor">Giám sát viên</label>
                                                            </div>
                                                            <div className="form-check checkbox">
                                                                <Field
                                                                    className="form-check-input"
                                                                    id="checkRoleConstructionUnit"
                                                                    type="checkbox"
                                                                    name="roles[2]" />
                                                                <label className="form-check-label" htmlFor="checkRoleConstructionUnit">Đơn vị thi công</label>
                                                            </div>
                                                            <Field
                                                                className={`form-control ${touched.roles && errors.roles ? "is-invalid" : ""}`}
                                                                type="hidden"
                                                                placeholder="Mật khẩu"
                                                                name="roles" />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="roles"
                                                                component="div" />
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
                                        </Fragment>
                                    )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Fragment >
        );
    }
}

export default connect()(UserCreate)
