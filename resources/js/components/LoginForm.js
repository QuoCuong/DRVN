import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

class LoginForm extends Component {
    componentDidMount() {
        $(".loader").remove()
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card-group">
                                <div className="card p-4">
                                    <div className="card-body">
                                        <h1>Đăng nhập</h1>
                                        <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                                        <Formik
                                            initialValues={{ email: '', password: '' }}
                                            validate={values => {
                                                let errors = {};

                                                //validate email
                                                if (!values.email) {
                                                    errors.email = 'Vui lòng nhập email!';
                                                } else if (
                                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                ) {
                                                    errors.email = 'Email không hợp lệ!';
                                                }

                                                //validate password
                                                if (!values.password) {
                                                    errors.password = "Vui lòng nhập mật khẩu!";
                                                } else if (values.password.length < 6) {
                                                    errors.password = "Mật khẩu phải có ít nhất 6 ký tự!"
                                                }

                                                return errors;
                                            }}
                                            onSubmit={() => {
                                                let loginForm = document.getElementById('login_form');

                                                loginForm.submit();
                                            }}
                                        >
                                            {({
                                                touched,
                                                errors,
                                                values,
                                                handleSubmit,
                                                isSubmitting,
                                            }) => (
                                                    <Form id="login_form" action="/admin/login" method="POST">
                                                        <Field
                                                            type="hidden"
                                                            name="_token"
                                                            value={window.Laravel.csrfToken} />
                                                        <div className="input-group mb-3 email">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">
                                                                    <i className="icon-user"></i>
                                                                </span>
                                                            </div>
                                                            <Field
                                                                className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                                type="text"
                                                                name="email"
                                                                placeholder="Địa chỉ email"
                                                                value={values.email} />
                                                            <ErrorMessage className="invalid-feedback" name="email" component="div" />
                                                        </div>
                                                        <div className="input-group mb-4 password">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">
                                                                    <i className="icon-lock"></i>
                                                                </span>
                                                            </div>
                                                            <Field
                                                                className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                                                type="password"
                                                                name="password"
                                                                placeholder="Mật khẩu"
                                                                value={values.password} />
                                                            <ErrorMessage className="invalid-feedback" name="password" component="div" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <button className="btn btn-primary px-4" type="submit" disabled={isSubmitting}>Đăng nhập</button>
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
                                <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                    <div className="card-body text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                                ncididunt ut labore et dolore magna aliqua.</p>
                                            <button className="btn btn-primary active mt-3" type="button">Register Now!</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
