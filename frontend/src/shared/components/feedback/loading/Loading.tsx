import React from 'react'

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-t-2 border-gray-200 border-t-gray-950 rounded-full animate-spin" />
            </div>
        </div>
    )
}
