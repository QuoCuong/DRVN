import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login } from '../api/auth'
import authActions from '../redux/auth/actions'
import LaddaButton, { ZOOM_IN } from 'react-ladda'

const Login = props => {
    const { loginSuccess, logginRequesting } = props

    return (
        <div className="app flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card-group">
                            <div className="card p-4">
                                <div className="card-body">
                                    <h1>Đăng nhập</h1>
                                    <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                                    <Formik
                                        initialValues={{ email: '', password: '' }}

                                        validationSchema={Yup.object().shape({
                                            email: Yup.string()
                                                .email('Địa chỉ email không hợp lệ')
                                                .required('Vui lòng nhập địa chỉ email'),
                                            password: Yup.string()
                                                .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
                                                .max(255, 'Mật khẩu quá dài')
                                                .required('Vui lòng nhập mật khẩu')
                                        })}

                                        onSubmit={(values, action) => {
                                            login(values)
                                                .then(res => {
                                                    window.localStorage.token = res.data.token
                                                    loginSuccess(res.data.user)
                                                })
                                                .catch(error => {
                                                    action.setErrors(error.response.data.errors)
                                                    action.setSubmitting(false)
                                                })
                                        }}
                                    >
                                        {({
                                            touched,
                                            errors,
                                            values,
                                            isSubmitting
                                        }) => (
                                            <Form>
                                                <Field
                                                    type="hidden"
                                                    name="_token"
                                                    value={window.Laravel.csrfToken}
                                                />
                                                <div className="input-group mb-3 email">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="icon-user"></i>
                                                        </span>
                                                    </div>
                                                    <Field
                                                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        name="email"
                                                        placeholder="Địa chỉ email"
                                                        value={values.email}
                                                    />
                                                    <ErrorMessage className="invalid-feedback" name="email" component="div" />
                                                </div>
                                                <div className="input-group mb-4 password">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="icon-lock"></i>
                                                        </span>
                                                    </div>
                                                    <Field
                                                        className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                                        type="password"
                                                        name="password"
                                                        placeholder="Mật khẩu"
                                                        value={values.password}
                                                    />
                                                    <ErrorMessage className="invalid-feedback" name="password" component="div" />
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <LaddaButton
                                                            className="btn btn-primary btn-ladda px-4"
                                                            type="submit"
                                                            data-color="#32A9D8"
                                                            data-style={ZOOM_IN}
                                                            loading={logginRequesting || isSubmitting}
                                                        >
                                                            Đăng nhập
                                                        </LaddaButton>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <button className="btn btn-link px-0" type="button">Quên mật khẩu?</button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.defaultProps = {
    logginRequesting: false,
    errors: []
}

const mapStateToProps = state => ({
    logginRequesting: state.auth.logginRequesting
})

const mapDispatchToProps = dispatch => ({
    loginSuccess: user => dispatch({
        type: authActions.LOGIN_SUCCESS,
        user: user
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
