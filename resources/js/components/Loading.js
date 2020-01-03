import React, { useEffect } from 'react'
import { MagicSpinner } from 'react-spinners-kit'

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
            <MagicSpinner
                size={60}
                color="#000"
                loading={true}
            />
        </div>
    )
}

export default Loading
