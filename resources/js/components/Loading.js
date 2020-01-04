import React, { useEffect } from 'react'
import { SpiralSpinner } from 'react-spinners-kit'

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
            <SpiralSpinner
                size={60}
                backColor="#000"
                frontColor="#32A9D8"
                loading={true}
            />
        </div>
    )
}

export default Loading
