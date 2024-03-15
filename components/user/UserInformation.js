import React from 'react'

const UserInformation = ({ data }) => {
    return (
        <>
            <div className='mt-10'>
                <h4 className='text-xl text-darkBlack font-medium'>User Information</h4>
                <div className='mt-5'>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Full name</p>
                        <p className='text-black text-base'>{data?.name}</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Email</p>
                        <p className='text-black text-base'>{data?.email}</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Contact number</p>
                        <p className='text-black text-base'>{data?.phone}</p>
                    </div>
                    <div className='flex mb-3'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>User ID</p>
                        <p className='text-black text-base'>{data?.id}</p>
                    </div>
                    <div className='flex mb-5'>
                        <p className='text-darkGray font-light text-base sm:w-[300px]'>Date of Birth</p>
                        <p className='text-black text-base'>{data?.dob}</p>
                    </div>
                </div>
            </div>
            {/* <div className='flex my-8'>
                <h4 className='sm:w-[300px] text-xl text-darkBlack font-medium'>Action</h4>
                <div>
                    <div className='w-[192px] h-[35px] relative'>
                        <select
                            className='w-full h-full text-sm text-darkBlack appearance-none rounded-[25px] border border-[#94BAD4] px-5'
                            style={{ boxShadow: '0px 2px 20px #CFD9DF66' }}
                        >
                            <option selected>Pause Vendor</option>
                        </select>
                        <img src='/img/down.svg' alt="down" className='absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[12px]' />
                    </div>
                    <p className='text-black text-xs lg:w-[370px] font-medium mt-4'>Select action and it will notify the vendor and system listing automatically.</p>
                </div>
            </div> */}
            {/* <div className='flex gap-x-10 mt-8'>
                <button
                    className='w-[176px] h-[46px] bg-success text-white font-light text-sm rounded-[14px]'
                >Submit</button>
                <button className='w-[176px] h-[46px] bg-[#AEC4DB] text-white font-light text-sm rounded-[14px]'>Cancel</button>
            </div> */}
        </>
    )
}

export default UserInformation