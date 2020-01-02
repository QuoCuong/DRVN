import React from 'react'
import ReactQuill from 'react-quill'

const Editor = props => {
    const { readOnly } = props

    let modules = {
        toolbar: readOnly ? false : [
            [{ 'header': [3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            ['blockquote'],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],

            [{ 'size': ['small', false, 'large', 'huge'] }],

            [{ 'color': [] }, { 'background': [] }],

            ['clean']
        ]
    }

    return (
        <ReactQuill
            modules={modules}
            disabled={true}
            {...props}
        />
    )
}

export default Editor
