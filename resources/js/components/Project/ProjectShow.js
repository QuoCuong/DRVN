import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import appActions from '../../redux/app/actions'
import {
    userShow
} from '../../api/users'
import {
    projectShow,
    updateProject
} from '../../api/projects'
import SupervisorList from './SupervisorList'
import ConstructionUnitList from './ConstructionUnitList'
import UserProfile from '../UserProfile'

require('@fancyapps/fancybox/dist/jquery.fancybox.min.css')

class ProjectShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {
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
            },
            isEdit: false,
            images: [],
            constructionUnit: {
                email: '',
                fullname: '',
                phone: ''
            },
            supervisor: {
                email: '',
                fullname: '',
                phone: ''
            },
            constructionUnits: [],
            supervisors: []
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params

        projectShow(id)
            .then(res => {
                this.setState({
                    ...this.state,
                    project: {
                        name: res.data.name,
                        investor: res.data.investor,
                        route_start: res.data.route_start,
                        route_end: res.data.route_end,
                        route_length: res.data.route_length,
                        location: res.data.location,
                        description: res.data.description || '',
                        start_date: res.data.start_date,
                        images: res.data.images,
                        supervisor_id: res.data.supervisor_id,
                        construction_unit_id: res.data.construction_unit_id
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidUpdate(prevProps, prevState) {
        (this.state.project.construction_unit_id !== '' && this.state.project.supervisor_id !== '') &&
            (this.state.project.construction_unit_id !== prevState.project.construction_unit_id && this.state.project.supervisor_id !== prevState.project.supervisor_id) &&
            axios.all([userShow(this.state.project.construction_unit_id), userShow(this.state.project.supervisor_id)])
                .then(axios.spread((constructionUnit, supervisor) => {
                    this.setState({
                        ...this.state,
                        constructionUnit: constructionUnit.data,
                        supervisor: supervisor.data
                    })
                }))
    }

    handleEditSwitchChange(e) {
        this.setState({
            ...this.state,
            isEdit: $(e.target).prop('checked')
        })
    }

    render() {
        const { isEdit } = this.state
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
                        <div style={{
                            display: 'flex',
                            position: 'absolute',
                            top: 5,
                            right: 0,
                            marginRight: 15
                        }}>
                            <label className="switch switch-label switch-success">
                                <input className="switch-input" type="checkbox" defaultChecked={false} onChange={this.handleEditSwitchChange.bind(this)} />
                                <span
                                    className="switch-slider"
                                    data-checked="On"
                                    data-unchecked="Off"
                                ></span>
                            </label>
                        </div>
                        <Formik
                            initialValues={{
                                name: this.state.project.name,
                                investor: this.state.project.investor,
                                route_start: this.state.project.route_start,
                                route_end: this.state.project.route_end,
                                route_length: this.state.project.route_length,
                                location: this.state.project.location,
                                description: this.state.project.description,
                                start_date: this.state.project.start_date,
                                images: [],
                                supervisor_id: this.state.project.supervisor_id,
                                construction_unit_id: this.state.project.construction_unit_id
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
                                    .required(),
                            })}

                            enableReinitialize={true}

                            onSubmit={(values, actions) => {
                                let formData = new FormData()

                                formData.append('_method', 'PUT');
                                formData.append('name', values.name);
                                formData.append('investor', values.investor);
                                formData.append('route_start', values.route_start);
                                formData.append('route_end', values.route_end);
                                formData.append('route_length', values.route_length);
                                formData.append('location', values.location);
                                formData.append('description', values.description);
                                formData.append('start_date', values.start_date);
                                formData.append('supervisor_id', values.supervisor_id);
                                formData.append('construction_unit_id', values.construction_unit_id);

                                values.images.length && values.images.map((image, i) => {
                                    formData.append(`images[${i}]`, image, image.name)
                                })

                                toggleLoading()
                                updateProject(this.props.match.params.id, formData)
                                    .then(res => {
                                        console.log(res)
                                        // this.props.history.push('/admin/projects')
                                        // $.notify({
                                        //     message: res.data['message']
                                        // }, {
                                        //     type: 'success'
                                        // })
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
                                values,
                                errors,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
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
                                                                className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                                                id="name-input"
                                                                type="text"
                                                                name="name"
                                                                value={values.name}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="name"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label require" htmlFor="investor-input">Chủ đầu tư</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.investor && errors.investor ? "is-invalid" : ""}`}
                                                                id="investor-input"
                                                                type="text"
                                                                name="investor"
                                                                value={values.investor}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="investor"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label require" htmlFor="start-input">Điểm đầu tuyến</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.route_start && errors.route_start ? "is-invalid" : ""}`}
                                                                id="start-input"
                                                                type="text"
                                                                name="route_start"
                                                                value={values.route_start}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="route_start"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label require" htmlFor="end-input">Điểm cuối tuyến</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.route_end && errors.route_end ? "is-invalid" : ""}`}
                                                                id="end-input"
                                                                type="text"
                                                                name="route_end"
                                                                value={values.route_end}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="route_end"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label require" htmlFor="length-input">Chiều dài tuyến</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.route_length && errors.route_length ? "is-invalid" : ""}`}
                                                                id="length-input"
                                                                type="text"
                                                                name="route_length"
                                                                value={values.route_length}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="route_length"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label require" htmlFor="location-input">Địa điểm xây dựng</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.location && errors.location ? "is-invalid" : ""}`}
                                                                id="location-input"
                                                                type="text"
                                                                name="location"
                                                                value={values.location}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="location"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label" htmlFor="textarea-input">Mô tả công trình</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.description && errors.description ? "is-invalid" : ""}`}
                                                                id="textarea-input"
                                                                component="textarea"
                                                                name="description"
                                                                rows="9"
                                                                value={values.description}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="description"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label require" htmlFor="date-input">Ngày thi công</label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.start_date && errors.start_date ? "is-invalid" : ""}`}
                                                                id="date-input"
                                                                type="date"
                                                                name="start_date"
                                                                value={values.start_date}
                                                                disabled={!isEdit} />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="start_date"
                                                                component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label" htmlFor="file-multiple-input">Hình ảnh</label>
                                                        <div className="col-md-9">
                                                            {
                                                                isEdit ? (
                                                                    <Field
                                                                        id="file-multiple-input"
                                                                        type="file"
                                                                        name="images[]"
                                                                        multiple
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            let images = []

                                                                            e.target.files.forEach(image => {
                                                                                images.push(image)
                                                                            })

                                                                            setFieldValue('images', images)
                                                                        }} />
                                                                ) : <FancyboxImageWrapper>
                                                                        {
                                                                            this.state.project.images.length ? this.state.project.images.map((image, i) => {
                                                                                return (
                                                                                    <FancyboxItem key={i}>
                                                                                        <a href={image.path} data-fancybox>
                                                                                            <FancyboxImage src={image.path} />
                                                                                        </a>
                                                                                    </FancyboxItem>
                                                                                )
                                                                            }) : null
                                                                        }
                                                                    </FancyboxImageWrapper>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="step-two" role="tabpanel">
                                                {
                                                    isEdit ? (
                                                        <ConstructionUnitList handleRowClick={(id) => {
                                                            setFieldValue('construction_unit_id', id)
                                                        }} />
                                                    ) : (
                                                            <UserProfile
                                                                email={this.state.constructionUnit.email}
                                                                fullname={this.state.constructionUnit.fullname}
                                                                phone={this.state.constructionUnit.phone} />
                                                        )
                                                }
                                            </div>
                                            <div className="tab-pane" id="step-three" role="tabpanel">
                                                {
                                                    isEdit ? (
                                                        <Fragment>
                                                            <SupervisorList handleRowClick={(id) => {
                                                                setFieldValue('supervisor_id', id)
                                                            }} />
                                                            <button type="submit" className="btn btn-sm btn-success w-100" disabled={isSubmitting}>Thêm <i className="fa fa-arrow-right"></i></button>
                                                        </Fragment>
                                                    ) : (
                                                            <UserProfile
                                                                email={this.state.supervisor.email}
                                                                fullname={this.state.supervisor.fullname}
                                                                phone={this.state.supervisor.phone} />
                                                        )
                                                }
                                            </div>
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

const FancyboxImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`

const FancyboxItem = styled.div`
    width: 200px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
`

const FancyboxImageWrapper = styled.div`

`

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(
    null,
    mapDispatchToProps
)(ProjectShow)
