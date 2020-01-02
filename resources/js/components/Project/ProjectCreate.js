import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import appActions from '../../redux/app/actions'
import { createProject } from '../../api/projects'
import ConstructionUnitList from './ConstructionUnitList'
import SupervisorList from './SupervisorList'
import Editor from '../Editor'

class ProjectCreate extends Component {
    render() {
        const { toggleLoading } = this.props

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#step-one" role="tab">
                                    <i className="fa fa-info-circle"></i> Thông tin công trình</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#step-two" role="tab">
                                    <i className="fa fa-users"></i> Đơn vị thi công</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#step-three" role="tab">
                                    <i className="fa fa-eye"></i> Giám sát viên</a>
                            </li>
                        </ul>
                        <Formik
                            initialValues={{
                                name: '',
                                investor: '',
                                route_start: '',
                                route_end: '',
                                route_length: '',
                                location: '',
                                description: '',
                                start_date: '',
                                images: [],
                                supervisor_id: '',
                                construction_unit_id: ''
                            }}

                            validationSchema={Yup.object().shape({
                                name: Yup.string()
                                    .min(2, 'Tối thiểu 2 ký tự')
                                    .required('Bắt buộc'),
                                investor: Yup.string()
                                    .min(2, 'Tối thiểu 2 ký tự')
                                    .required('Bắt buộc'),
                                route_start: Yup.string()
                                    .required('Bắt buộc'),
                                route_end: Yup.string()
                                    .required('Bắt buộc'),
                                route_length: Yup.string()
                                    .required('Bắt buộc'),
                                location: Yup.string()
                                    .required('Bắt buộc'),
                                start_date: Yup.date()
                                    .min(new Date(), 'Không hợp lệ')
                                    .required('Bắt buộc'),
                                supervisor_id: Yup.number()
                                    .required(),
                                construction_unit_id: Yup.number()
                                    .required()
                            })}

                            onSubmit={(values, actions) => {
                                let formData = new FormData()

                                formData.append('name', values.name)
                                formData.append('investor', values.investor)
                                formData.append('route_start', values.route_start)
                                formData.append('route_end', values.route_end)
                                formData.append('route_length', values.route_length)
                                formData.append('location', values.location)
                                formData.append('description', values.description)
                                formData.append('start_date', values.start_date)
                                formData.append('supervisor_id', values.supervisor_id)
                                formData.append('construction_unit_id', values.construction_unit_id)

                                values.images.length && values.images.map((image, i) => {
                                    formData.append(`images[${i}]`, image, image.name)
                                })

                                toggleLoading()
                                createProject(formData)
                                    .then(res => {
                                        this.props.history.push(`/admin/projects/${res.data.project.id}`)
                                        $.notify({
                                            message: res.data.message
                                        }, {
                                            type: 'success'
                                        })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                                    .finally(() => {
                                        toggleLoading()
                                    })
                                actions.setSubmitting(false)
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
                                    id="createProjectForm"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                    encType="multipart/form-data"
                                >
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="step-one" role="tabpanel">

                                            <div className="col-md-12">
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label require" htmlFor="name-input">Tên công trình</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                            id="name-input"
                                                            type="text"
                                                            name="name"
                                                            placeholder="Tên công trình"
                                                        />
                                                        <ErrorMessage
                                                            className="invalid-feedback"
                                                            name="name"
                                                            component="div"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label require" htmlFor="investor-input">Chủ đầu tư</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`form-control ${touched.investor && errors.investor ? 'is-invalid' : ''}`}
                                                            id="investor-input"
                                                            type="text"
                                                            name="investor"
                                                            placeholder="Chủ đầu tư"
                                                        />
                                                        <ErrorMessage
                                                            className="invalid-feedback"
                                                            name="investor"
                                                            component="div"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label require" htmlFor="start-input">Điểm đầu tuyến</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`form-control ${touched.route_start && errors.route_start ? 'is-invalid' : ''}`}
                                                            id="start-input"
                                                            type="text"
                                                            name="route_start"
                                                            placeholder="Điểm đầu tuyến"
                                                        />
                                                        <ErrorMessage
                                                            className="invalid-feedback"
                                                            name="route_start"
                                                            component="div"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label require" htmlFor="end-input">Điểm cuối tuyến</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`form-control ${touched.route_end && errors.route_end ? 'is-invalid' : ''}`}
                                                            id="end-input"
                                                            type="text"
                                                            name="route_end"
                                                            placeholder="Điểm cuối tuyến"
                                                        />
                                                        <ErrorMessage
                                                            className="invalid-feedback"
                                                            name="route_end"
                                                            component="div"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label require" htmlFor="length-input">Chiều dài tuyến</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`form-control ${touched.route_length && errors.route_length ? 'is-invalid' : ''}`}
                                                            id="length-input"
                                                            type="text"
                                                            name="route_length"
                                                            placeholder="Chiều dài tuyến"
                                                        />
                                                        <ErrorMessage
                                                            className="invalid-feedback"
                                                            name="route_length"
                                                            component="div"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label require" htmlFor="location-input">Địa điểm xây dựng</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`form-control ${touched.location && errors.location ? 'is-invalid' : ''}`}
                                                            id="location-input"
                                                            type="text"
                                                            name="location"
                                                            placeholder="Địa điểm xây dựng"
                                                        />
                                                        <ErrorMessage
                                                            className="invalid-feedback"
                                                            name="location"
                                                            component="div"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" htmlFor="textarea-input">Mô tả công trình</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`${touched.description && errors.description ? 'is-invalid' : ''}`}
                                                            id="textarea-input"
                                                            name="description"
                                                        >
                                                            {({ field }) => (
                                                                <Editor value={field.value} onChange={field.onChange(field.name)} />
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
                                                    <label className="col-md-3 col-form-label require" htmlFor="date-input">Ngày thi công</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            className={`form-control ${touched.start_date && errors.start_date ? 'is-invalid' : ''}`}
                                                            id="date-input"
                                                            type="date"
                                                            name="start_date"
                                                        />
                                                        <ErrorMessage
                                                            className="invalid-feedback"
                                                            name="start_date"
                                                            component="div"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" htmlFor="file-multiple-input">Hình ảnh</label>
                                                    <div className="col-md-9">
                                                        <Field
                                                            id="file-multiple-input"
                                                            type="file"
                                                            name="images[]"
                                                            multiple
                                                            accept="image/*"
                                                            onChange={e => {
                                                                let images = []

                                                                e.target.files.forEach(image => {
                                                                    images.push(image)
                                                                })

                                                                setFieldValue('images', images)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="step-two" role="tabpanel">
                                            <ConstructionUnitList handleRowClick={id => {
                                                setFieldValue('construction_unit_id', id)
                                            }}
                                            />
                                        </div>
                                        <div className="tab-pane" id="step-three" role="tabpanel">
                                            <SupervisorList handleRowClick={id => {
                                                setFieldValue('supervisor_id', id)
                                            }}
                                            />
                                        </div>
                                    </div>
                                    <div className="float-right">
                                        <button
                                            type="submit"
                                            className="btn btn-sm btn-success mt-2"
                                            disabled={isSubmitting}
                                        >
                                                Thêm{' '}
                                            <i className="fa fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div >
            </Fragment >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(ProjectCreate)
