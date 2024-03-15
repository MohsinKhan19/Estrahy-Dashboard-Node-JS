import React from 'react'

const ErrorMessage = ({ message }) =>
{
    return (
        <div >
            <p className='text-sm mt-1.5 text-pink'>{ message }</p>
        </div>
    )
}

export default ErrorMessage
