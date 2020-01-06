import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import appActions from '../../redux/app/actions'
import { projectShow, updateProject, suspendProject, cancelProject } from '../../api/projects'
import SupervisorList from './SupervisorList'
import ConstructionUnitList from './ConstructionUnitList'
import UserProfile from '../UserProfile'
import ToggleEditButton from './ToggleEditButton'
import ProjectStatusBadge from '../badges/ProjectStatusBadge'
import ActionButtonGroup from './ActionButtonGroup'
import ProgressTimeline from './ProgressTimeline'
import CreateProgressButton from './actionButtons/CreateProgressButton'

import Notification from '../../helpers/Notification'
import Editor from '../Editor'

const ProjectShow = props => {
    const [isEdit, setEdit] = useState(false)
    const [projectData, setProjectData] = useState({
        name: '',
        investor: '',
        route_start: '',
        route_end: '',
        route_length: '',
        location: '',
        description: '',
        start_date: '',
        supervisor_id: '',
        construction_unit_id: '',
        construction_unit: {
            email: '',
            fullname: '',
            phone: ''
        },
        supervisor: {
            email: '',
            fullname: '',
            phone: ''
        },
        images: [],
        progresses: []
    })
    const { id: projectId } = props.match.params
    const { supervisor, construction_unit, images, progresses, reason, status } = projectData
    const { toggleLoading } = props

    useEffect(() => {
        fetchProject()
        goToHashTab()
    }, [])

    const fetchProject = () => {
        toggleLoading()
        projectShow(projectId)
            .then(res => {
                setProjectData(res.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                toggleLoading()
            })
    }

    const goToHashTab = () => {
        const { hash } = props.location

        if (hash) {
            $(`a[href="${hash}"]`).click()
        }
    }

    const handleActionCompleted = (tab = '') => {
        fetchProject()
        $(`a[href="#${tab}"]`).click()
    }

    const resetUI = () => {
        $('input.switch-input').prop(
            'checked',
            false
        )
        $('.nav-tabs a[href="#project_info_tab"]').tab(
            'show'
        )
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <Formik
                        initialValues={{
                            name: projectData.name,
                            investor: projectData.investor,
                            route_start: projectData.route_start,
                            route_end: projectData.route_end,
                            route_length: projectData.route_length,
                            location: projectData.location,
                            description: projectData.description,
                            start_date: projectData.start_date,
                            images: [],
                            supervisor_id: projectData.supervisor_id,
                            construction_unit_id: projectData.construction_unit_id
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .min(2, 'Tối thiểu 2 ký tự')
                                .required('Bắt buộc'),
                            investor: Yup.string()
                                .min(2, 'Tối thiểu 2 ký tự')
                                .required('Bắt buộc'),
                            route_start: Yup.string().required('Bắt buộc'),
                            route_end: Yup.string().required('Bắt buộc'),
                            route_length: Yup.string().required('Bắt buộc'),
                            location: Yup.string().required('Bắt buộc'),
                            start_date: Yup.date()
                                .min(new Date(), 'Phải sau ngày hiện tại')
                                .required('Bắt buộc'),
                            supervisor_id: Yup.number().required(),
                            construction_unit_id: Yup.number().required()
                        })}
                        enableReinitialize={true}
                        onSubmit={(values, actions) => {
                            const formData = new FormData()

                            formData.append('_method', 'PUT')
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
                            updateProject(projectId, formData)
                                .then(res => {
                                    resetUI()
                                    setProjectData({
                                        ...projectData,
                                        ...res.data.project
                                    })
                                    setEdit(false)

                                    Notification.success(res.data.message)
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
                            setFieldValue
                        }) => (
                            <Form onSubmit={handleSubmit}
                                autoComplete="off"
                                encType="multipart/form-data"
                            >
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-header-actions">
                                            <ToggleEditButton
                                                isEdit={isEdit}
                                                setEdit={setEdit}
                                                projectStatus={projectData.status}
                                            />
                                            {
                                                isEdit ? (
                                                    <button
                                                        type="submit"
                                                        className="btn btn-sm btn-success"
                                                        disabled={isSubmitting}
                                                    >
                                                        <i className="fa fa-dot-circle-o"></i> Cập nhật
                                                    </button>
                                                ) : <ActionButtonGroup
                                                    projectId={projectId}
                                                    projectStatus={projectData.status}
                                                    handleActionCompleted={handleActionCompleted}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link active"
                                                    data-toggle="tab"
                                                    href="#project_info_tab"
                                                    role="tab"
                                                >
                                                    <i className="fa fa-info-circle"></i> Thông tin công trình
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link"
                                                    data-toggle="tab"
                                                    href="#construction_unit_tab"
                                                    role="tab"
                                                >
                                                    <i className="fa fa-users"></i> Đơn vị thi công
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link"
                                                    data-toggle="tab"
                                                    href="#supervisor_tab"
                                                    role="tab"
                                                >
                                                    <i className="fa fa-eye"></i> Giám sát viên
                                                </a>
                                            </li>
                                            {
                                                !isEdit ? (
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link"
                                                            data-toggle="tab"
                                                            href="#progress_tab"
                                                            role="tab"
                                                        >
                                                            <i className="fa fa-line-chart"></i> Tiến độ
                                                        </a>
                                                    </li>
                                                ) : null
                                            }
                                        </ul>
                                        <div className="tab-content">
                                            <div
                                                className="tab-pane active"
                                                id="project_info_tab"
                                                role="tabpanel"
                                            >
                                                <div className="col-md-12">
                                                    <div className="form-group row">
                                                        <label
                                                            className="col-md-3 col-form-label"
                                                            htmlFor="name-input"
                                                        >
                                                                Tình trạng
                                                        </label>
                                                        <div className="col-md-9">
                                                            <div className="flex">
                                                                <ProjectStatusBadge status={projectData.status} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        (reason && ['suspended', 'cancelled'].includes(status)) ? (
                                                            <div className="form-group row">
                                                                <label
                                                                    className="col-md-3 col-form-label"
                                                                    htmlFor="name-input"
                                                                >
                                                                        Lý do
                                                                </label>
                                                                <div className="col-md-9">
                                                                    <p style={{ color: 'red' }}>{reason}</p>
                                                                </div>
                                                            </div>
                                                        ) : null
                                                    }
                                                    <div className="form-group row">
                                                        <label
                                                            className={`col-md-3 col-form-label ${isEdit && 'require'}`}
                                                            htmlFor="name-input"
                                                        >
                                                                Tên công trình
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                                id="name-input"
                                                                type="text"
                                                                name="name"
                                                                value={values.name}
                                                                disabled={!isEdit}
                                                            />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="name"
                                                                component="div"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label
                                                            className={`col-md-3 col-form-label ${isEdit && 'require'}`}
                                                            htmlFor="investor-input"
                                                        >
                                                                Chủ đầu tư
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.investor && errors.investor ? 'is-invalid' : ''}`}
                                                                id="investor-input"
                                                                type="text"
                                                                name="investor"
                                                                value={values.investor}
                                                                disabled={!isEdit}
                                                            />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="investor"
                                                                component="div"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label
                                                            className={`col-md-3 col-form-label ${isEdit && 'require'}`}
                                                            htmlFor="start-input"
                                                        >
                                                                Điểm đầu tuyến
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.route_start && errors.route_start ? 'is-invalid' : ''}`}
                                                                id="start-input"
                                                                type="text"
                                                                name="route_start"
                                                                value={values.route_start}
                                                                disabled={!isEdit}
                                                            />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="route_start"
                                                                component="div"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label
                                                            className={`col-md-3 col-form-label ${isEdit && 'require'}`}
                                                            htmlFor="end-input"
                                                        >
                                                                Điểm cuối tuyến
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.route_end && errors.route_end ? 'is-invalid': ''}`}
                                                                id="end-input"
                                                                type="text"
                                                                name="route_end"
                                                                value={values.route_end}
                                                                disabled={!isEdit}
                                                            />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="route_end"
                                                                component="div"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label
                                                            className={`col-md-3 col-form-label ${isEdit && 'require'}`}
                                                            htmlFor="length-input"
                                                        >
                                                                Chiều dài tuyến
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.route_length && errors.route_length ? 'is-invalid' : ''}`}
                                                                id="length-input"
                                                                type="text"
                                                                name="route_length"
                                                                value={values.route_length}
                                                                disabled={!isEdit}
                                                            />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="route_length"
                                                                component="div"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label
                                                            className={`col-md-3 col-form-label ${isEdit && 'require'}`}
                                                            htmlFor="location-input"
                                                        >
                                                                Địa điểm xây dựng
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.location && errors.location ? 'is-invalid' : ''}`}
                                                                id="location-input"
                                                                type="text"
                                                                name="location"
                                                                value={values.location}
                                                                disabled={!isEdit}
                                                            />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="location"
                                                                component="div"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label
                                                            className="col-md-3 col-form-label"
                                                            htmlFor="textarea-input"
                                                        >
                                                                Mô tả công trình
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`${touched.description && errors.description ? 'is-invalid' : ''}`}
                                                                id="textarea-input"
                                                                name="description"
                                                            >
                                                                {({ field }) => (
                                                                    <Editor
                                                                        value={field.value}
                                                                        onChange={field.onChange(field.name)}
                                                                        readOnly={!isEdit}
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
                                                        <label
                                                            className={`col-md-3 col-form-label ${isEdit && 'require'}`}
                                                            htmlFor="date-input"
                                                        >
                                                                Ngày thi công
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Field
                                                                className={`form-control ${touched.start_date && errors.start_date ? 'is-invalid' : ''}`}
                                                                id="date-input"
                                                                type="date"
                                                                name="start_date"
                                                                value={values.start_date}
                                                                disabled={!isEdit}
                                                            />
                                                            <ErrorMessage
                                                                className="invalid-feedback"
                                                                name="start_date"
                                                                component="div"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label
                                                            className="col-md-3 col-form-label"
                                                            htmlFor="file-multiple-input"
                                                        >
                                                                Hình ảnh
                                                        </label>
                                                        <div className="col-md-9">
                                                            {isEdit ? (
                                                                <Field
                                                                    id="file-multiple-input"
                                                                    type="file"
                                                                    name="images[]"
                                                                    multiple
                                                                    accept="image/*"
                                                                    onChange={e => {
                                                                        const images = []

                                                                        e.target.files.forEach(
                                                                            image => images.push(image)
                                                                        )

                                                                        setFieldValue('images', images)
                                                                    }}
                                                                />
                                                            ) : (
                                                                <FancyboxImageWrapper>
                                                                    {
                                                                        images.length ? images.map((image, i) => {
                                                                            return (
                                                                                <FancyboxItem key={i} >
                                                                                    <a href={image.path} data-fancybox>
                                                                                        <FancyboxImage src={image.path} />
                                                                                    </a>
                                                                                </FancyboxItem>
                                                                            )
                                                                        }) : null
                                                                    }
                                                                </FancyboxImageWrapper>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane"
                                                id="construction_unit_tab"
                                                role="tabpanel"
                                            >
                                                {
                                                    isEdit ? (
                                                        <ConstructionUnitList
                                                            handleRowClick={id => { setFieldValue('construction_unit_id', id)} }
                                                        />
                                                    ) : (
                                                        <UserProfile
                                                            email={construction_unit.email}
                                                            fullname={construction_unit.fullname}
                                                            phone={construction_unit.phone}
                                                        />
                                                    )
                                                }
                                            </div>
                                            <div
                                                className="tab-pane"
                                                id="supervisor_tab"
                                                role="tabpanel"
                                            >
                                                {
                                                    isEdit ? (
                                                        <SupervisorList
                                                            handleRowClick={ id => {setFieldValue('supervisor_id', id)} }
                                                        />
                                                    ) : (
                                                        <UserProfile
                                                            email={supervisor.email}
                                                            fullname={supervisor.fullname}
                                                            phone={supervisor.phone}
                                                        />
                                                    )
                                                }
                                            </div>
                                            {
                                                !isEdit ? (
                                                    <div
                                                        className="tab-pane"
                                                        id="progress_tab"
                                                        role="tabpanel"
                                                    >
                                                        <div className="text-right">
                                                            <CreateProgressButton projectStatus={projectData.status} />
                                                        </div>
                                                        <ProgressTimeline progresses={progresses} projectStatus={status} handleActionCompleted={handleActionCompleted} />
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div id="suspendProjectModal" className="modal" role="dialog" tabIndex="-1">
                <div className="modal-dialog modal-warning" role="document">
                    <Formik
                        initialValues={{
                            reason: ''
                        }}

                        validationSchema={Yup.object().shape({
                            reason: Yup.string().required('Bắt buộc')
                        })}

                        onSubmit={(values, actions) => {
                            $('#suspendProjectModal').modal('hide')
                            toggleLoading()
                            suspendProject(projectId, values)
                                .then(res => {
                                    handleActionCompleted('project_info_tab')
                                    Notification.success(res.data.message)
                                })
                                .catch(error => {
                                    Notification.error(error.response.data.message)
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
                            isSubmitting
                        }) => (
                            <Form>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Lý do</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <Field name="reason" type="text" className={`form-control ${touched.reason && errors.reason ? 'is-invalid' : '' }`} />
                                        <ErrorMessage
                                            className="invalid-feedback"
                                            name="reason"
                                            component="div"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-warning" disabled={isSubmitting}>Tạm dừng công trình</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Quay lại</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div id="cancelProjectModal" className="modal" role="dialog" tabIndex="-1">
                <div className="modal-dialog modal-danger" role="document">
                    <Formik
                        initialValues={{
                            reason: ''
                        }}

                        validationSchema={Yup.object().shape({
                            reason: Yup.string().required('Bắt buộc')
                        })}

                        onSubmit={(values, actions) => {
                            $('#cancelProjectModal').modal('hide')
                            toggleLoading()
                            cancelProject(projectId, values)
                                .then(res => {
                                    handleActionCompleted('project_info_tab')
                                    Notification.success(res.data.message)
                                })
                                .catch(error => {
                                    Notification.error(error.response.data.message)
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
                            isSubmitting
                        }) => (
                            <Form>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Lý do</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <Field name="reason" type="text" className={`form-control ${touched.reason && errors.reason ? 'is-invalid' : '' }`} />
                                        <ErrorMessage
                                            className="invalid-feedback"
                                            name="reason"
                                            component="div"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-danger" disabled={isSubmitting}>Hủy công trình</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Quay lại</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
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

const FancyboxImageWrapper = styled.div``

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(appActions.toggleLoading())
})

export default connect(null, mapDispatchToProps)(ProjectShow)
