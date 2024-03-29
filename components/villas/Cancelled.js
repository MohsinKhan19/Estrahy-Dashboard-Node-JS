import React from 'react'

const VillaInformation = ({ data }) => {
    return (
        <>
            {/* Table start */}
            <div
                className='bg-white py-[22px] mt-[28px] rounded-[8px] relative mb-20'
                style={{
                    'boxShadow': '0px 0px 20px #D7DEE365'
                }}
            >
                <div className='px-[25px]'>
                    <h1 className='font-medium text-[20px] text-[#2E3039]'>Cancelled Bookings</h1>
                </div>
                <div className='mt-[20px] overflow-x-auto'>
                    <table className='table-fixed w-[750px] md:w-full'>
                        <thead >
                            <tr className='bg-[#08488C]'>
                                <th className='py-[11px] text-xs text-white font-light text-start  pl-[36px] w-[200px]'>VILLA NAME</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>BOOKING ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start w-[100px]'>CITY</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>CUSTOMER NAME</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>DATES</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>STATUS</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data) && data.map((item, index) => {
                                return (
                                    <tr className='border-b last:border-b-0 border-[#EFF3F9]' key={index}>
                                        <td className=' pl-[36px] py-[24px] text-[#54617A]  text-sm font-roboto '>{item?.villa_name}</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>{item?.villa_id}</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm '>{item?.city}</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>{item?.customer_name}</td>
                                        <td className='  py-[24px] text-black font-roboto text-sm'>{item?.date}</td>
                                        <td className='  py-[24px] text-[#F52D56] font-medium font-roboto text-sm'>{item?.status}</td>
                                        <td className='  py-[24px] text-black font-medium text-sm cursor-pointer'>
                                            {item?.amount}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            {/* Table end */}
        </>
    )
}

export default VillaInformation