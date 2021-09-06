import React from 'react'

const Spinner = () => {
        return (
            <div className="text-center">
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden my-3">Loading...</span>
                </div>
            </div>
        )
}

export default Spinner
