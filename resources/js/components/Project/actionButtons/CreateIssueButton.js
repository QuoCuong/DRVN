import React, { useState } from 'react'
import useUserRole from '../../hooks/useUserRole'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import Editor from '../../Editor'
import { issues } from '../../../api/progresses'
import Notification from '../../../helpers/Notification'

const CreateIssueButton = props => {
    const [modal, setModal] = useState(false)
    const [text, setText] = useState(props.issues || '')
    const [error, setError] = useState('')
    const { progressId, projectStatus, handleActionCompleted } = props
    const EMPTY_REACT_QUILL = '<p><br></p>'
    const acceptRole = 'admin'

    const toggle = () => {
        setModal(!modal)
    }

    const onEditorChange = value => {
        setText(value)
    }

    const handleSubmit = () => {
        if (isEditorEmpty()) {
            setError('Bắt buộc')
        } else {
            issues(progressId, text)
                .then(res => {
                    Notification.success(res.data.message)
                    handleActionCompleted()
                })
                .catch(error => {
                    Notification.error(error.response.data.message)
                })
                .finally(() => {
                    toggle()
                })
        }
    }

    function isEditorEmpty() {
        return (!text || text === EMPTY_REACT_QUILL) ? true : false
    }

    if (!useUserRole(acceptRole) || ['suspended', 'cancelled'].includes(projectStatus))
        return null

    return (
        <>
            <button
                type="button"
                className="btn-pill btn btn-danger btn-sm"
                onClick={toggle}
            >Có vấn đề?</button>
            <Modal isOpen={modal}>
                <ModalBody>
                    <Editor className={`${error ? 'is-invalid' : ''}`} value={text} onChange={onEditorChange} />
                    {
                        error && (
                            <div className="invalid-feedback">
                                {error}
                            </div>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={handleSubmit}>Gửi</Button>
                    <Button color="secondary" onClick={toggle}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CreateIssueButton