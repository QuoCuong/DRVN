import React, { useEffect } from 'react'
import { CircleSpinner } from 'react-spinners-kit'

const Loading = () => {
    useEffect(() => {
        $('body').css({
            'overflow': 'hidden'
        })

        return () => {
            $('body').css({
                'overflow': 'auto'
            })
        }
    })

    return (
        <div className="loading">
            <CircleSpinner
                size={40}
                color="#32A9D8"
                loading={true}
            />
        </div>
    )
}

export default Loading
