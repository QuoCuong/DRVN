import React from 'react'
import { connect } from 'react-redux'
import appActions from '../../redux/app/actions'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { createProjectProgress } from '../../api/progresses'

import Notification from '../../helpers/Notification'
import Editor from '../Editor'

const ProgressCreate = props => {
    const { toggleLoading } = props
    const { id: projectId } = props.match.params

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card">
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            is_complete: false,
                            images: []
                        }}

                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .required('Bắt buộc'),
                            description: Yup.string(),
                            is_complete: Yup.boolean(),
                            images: Yup.array()
                                .required('Bắt buộc')
                        })}

                        onSubmit={(values, actions) => {
                            let formData = new FormData()

                            formData.append('name', values.name)
                            formData.append('description', values.description)
                            formData.append('is_complete', values.is_complete ? 1 : 0)

                            values.images.length && values.images.map((image, i) => {
                                formData.append(`images[${i}]`, image, image.name)
                            })

                            toggleLoading()
                            createProjectProgress(projectId, formData)
                                .then(res => {
                                    Notification.success(res.data.message)
                                    props.history.push(`/admin/projects/${projectId}#progress_tab`)
                                })
                                .catch(error => {
                                    Notification.error(error.response.data.message)
                                    actions.setErrors(error.response.data.errors)
                                })
                                .finally(() => {
                                    actions.setSubmitting(false)
                                    toggleLoading()
                                })
                        }}
                    >
                        {({
                            touched,
                            errors,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                        }) => (
                            <Form
                                className="form-horizontal"
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <div className="card-header">
                                    <i className="fa fa-plus"></i> Báo cáo tiến độ
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="require col-md-3 col-form-label">Tiêu đề</label>
                                        <div className="col-md-9">
                                            <Field
                                                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                type="text"
                                                placeholder="Tiêu đề"
                                                name="name"
                                            />
                                            <ErrorMessage
                                                className="invalid-feedback"
                                                name="name"
                                                component="div"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Mô tả</label>
                                        <div className="col-md-9">
                                            <Field
                                                className={`${touched.description && errors.description ? 'is-invalid' : ''}`}
                                                type="text"
                                                placeholder="Mô tả"
                                                name="description"
                                            >
                                                {({ field }) => (
                                                    <Editor
                                                        value={field.value}
                                                        onChange={field.onChange(field.name)}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage
                                                className="invalid-feedback"
                                                name="description"
                                                component="div"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Đã hoàn thành?</label>
                                        <div className="col-md-9 col-form-label">
                                            <div className="form-check checkbox">
                                                <Field
                                                    className={`form-check-input ${touched.is_complete && errors.is_complete ? 'is-invalid' : ''}`}
                                                    type="checkbox"
                                                    name="is_complete"
                                                />
                                                <ErrorMessage
                                                    className="invalid-feedback"
                                                    name="phone"
                                                    component="div"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="require col-md-3 col-form-label">Hình ảnh</label>
                                        <div className="col-md-9">
                                            <Field
                                                className={`${touched.images && errors.images ? 'is-invalid' : ''}`}
                                                type="file"
                                                name="images[]"
                                                accept="image/*"
                                                multiple
                                                onChange={e => {
                                                    let images = []

                                                    e.target.files.forEach(image => {
                                                        images.push(image)
                                                    })

                                                    setFieldValue('images', images)
                                                }}
                                            />
                                            <ErrorMessage
                                                className="invalid-feedback"
                                                name="images"
                                                component="div"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-sm btn-primary" type="submit" disabled={isSubmitting}>
                                        <i className="fa fa-dot-circle-o"></i> Báo cáo</button>
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

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(ProgressCreate)
