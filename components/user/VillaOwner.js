import React from 'react'

const VillaInformation = () => {
    return (
        <>
            <div className='mt-10'>
                <h4 className='text-xl text-darkBlack font-medium'>Villa Owner</h4>
                <div className='mt-5'>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Focal Person</p>
                        <p className='text-black text-base'>Ali Al dehan</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Email</p>
                        <p className='text-black text-base'>Saleh@gmail.com</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Phone</p>
                        <p className='text-black text-base'>+1 98798789</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Address</p>
                        <p className='text-black text-base'>Here is the complete address</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>National ID Card</p>
                        <p className='text-black text-base'>3221312312 213213123</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Total Villas</p>
                        <p className='text-black text-base'>01</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Total Bookings</p>
                        <p className='text-black text-base'>120</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Disputes</p>
                        <p className='text-black text-base'>06</p>
                    </div>
                </div>
            </div>
            <div className='flex my-8'>
                <h4 className='sm:w-[300px] text-xl text-darkBlack font-medium'>Action</h4>
                <div>
                    <div className='w-[192px] h-[35px] relative'>
                        <select
                            className='w-full h-full text-sm text-darkBlack appearance-none rounded-[25px] border border-[#94BAD4] px-5'
                            style={{ boxShadow: '0px 2px 20px #CFD9DF66' }}
                        >
                            <option selected>Pause Villa</option>
                        </select>
                        <img src='/img/down.svg' alt="down" className='absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[12px]' />
                    </div>
                    <p className='text-black text-xs lg:w-[370px] font-medium mt-4'>Select action and it will notify the vendor and system listing automatically.</p>
                </div>
            </div>
        </>
    )
}

export default VillaInformation