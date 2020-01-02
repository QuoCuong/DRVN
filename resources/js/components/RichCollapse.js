import React, { useState } from 'react'
import { Collapse } from 'reactstrap'

const RichCollapse = props => {
    const [isOpen, setIsOpen] = useState(false)
    const { buttonName, buttonClass, children } = props

    const toggle = () => setIsOpen(!isOpen)

    if (!children)
        return null

    return (
        <div>
            <button type="button" onClick={toggle} className={`m-0 p-0 btn btn-link ${buttonClass}`}>{buttonName}</button>
            <Collapse isOpen={isOpen}>
                <div dangerouslySetInnerHTML={{ __html: children }} />
            </Collapse>
        </div>
    )
}

RichCollapse.defaultProps = {
    buttonClass: ''
}

export default RichCollapse
