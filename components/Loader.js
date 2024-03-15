import React from 'react';

const Loader = () =>
{
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70 z-50'>
            <div class="lds-hourglass"></div>
        </div>
    );
}

export default Loader;
