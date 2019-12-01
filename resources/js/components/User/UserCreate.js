import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createUser } from '../../api/users'
import actions from '../../redux/app/actions'

class UserCreate extends Component {
    render() {
        const { toggleLoading } = this.props

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

                                validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email('Email không hợp lệ')
                                        .required('Bắt buộc'),
                                    fullname: Yup.string()
                                        .required('Bắt buộc'),
                                    phone: Yup.string()
                                        .matches(/(09|03|07|08|05)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
                                        .required('Bắt buộc'),
                                    roles: Yup.array()
                                        .compact()
                                        .required('Vui lòng chọn ít nhất 1 vai trò')
                                })}

                                onSubmit={(values, actions) => {
                                    this.props.toggleLoading()
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
                                            this.props.toggleLoading()
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
                                    )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Fragment >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(actions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(UserCreate)
