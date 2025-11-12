import { Spin } from 'antd'
import React from 'react'

export default function Loading() {
    return (
        <div className='flex-1 flex flex-col items-center justify-center'>
            <Spin size="large" />
        </div>
    )
}
