import React from 'react'

export default function Spinner() {
        return (
            <div className="text-center">
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden my-3">Loading...</span>
                </div>
            </div>
        )
}
