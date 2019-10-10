import React, { Component, Fragment } from 'react'

class ProjectCreate extends Component {
    render() {
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
                        <div className="tab-content">
                            <div className="tab-pane active" id="step-one" role="tabpanel">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="text-input">Tên công trình</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="text-input" type="text" name="text-input" placeholder="Tên công trình" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="investor-input">Chủ đầu tư</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="investor-input" type="text" name="text-input" placeholder="Chủ đầu tư" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="start-input">Điểm đầu tuyến</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="start-input" type="text" name="text-input" placeholder="Điểm đầu tuyến" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="end-input">Điểm cuối tuyến</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="end-input" type="text" name="text-input" placeholder="Điểm cuối tuyến" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="length-input">Chiều dài tuyến</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="length-input" type="text" name="text-input" placeholder="Chiều dài tuyến" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="location-input">Địa điểm xây dựng</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="location-input" type="text" name="text-input" placeholder="Địa điểm xây dựng" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="textarea-input">Mô tả công trình</label>
                                        <div className="col-md-9">
                                        <textarea className="form-control" id="textarea-input" name="textarea-input" rows="9" placeholder="Mô tả"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="date-input">Ngày thi công</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="date-input" type="date" name="date-input" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="file-input">File input</label>
                                        <div className="col-md-9">
                                            <input id="file-input" type="file" name="file-input" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="file-multiple-input">Multiple File input</label>
                                        <div className="col-md-9">
                                            <input id="file-multiple-input" type="file" name="file-multiple-input" multiple="" />
                                        </div>
                                    </div>
                                </div>
                                <a className="btn btn-sm btn-primary nav-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        $(`a.nav-link[href="#step-two"]`).click()
                                    }}>Tiếp tục <i className="fa fa-arrow-right"></i></a>
                            </div>
                            <div className="tab-pane" id="step-two" role="tabpanel">construction unit</div>
                            <div className="tab-pane" id="step-three" role="tabpanel">supervisor</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ProjectCreate