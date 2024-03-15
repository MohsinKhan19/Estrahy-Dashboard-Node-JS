import React from 'react'

const Reviews = ({ data }) =>
{
    return (
        <>
            {/* Table start */ }
            <div
                className='bg-white py-[22px] mt-[28px] rounded-[8px] relative mb-20'
                style={ {
                    'boxShadow': '0px 0px 20px #D7DEE365'
                } }
            >
                <div className='px-[25px]'>
                    <h1 className='font-medium text-[20px] text-[#2E3039]'>All Reviews</h1>
                </div>
                <div className='mt-[20px] '>
                    <table className='table-fixed w-full'>
                        <thead >
                            <tr className='bg-[#08488C]'>
                                <th className='py-[11px] text-xs text-white font-light text-start  pl-[36px] w-[200px]'>NAME OF VILLAS</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>BOOKING ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start pr-8 w-[100px]'>STARS</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>DESCRIPTION</th>
                                <th className='py-[11px] text-xs text-white font-light text-start pl-5'>DATE</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>VILLA ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Array?.isArray(data) && data?.map((item, index) =>
                            {
                                return (
                                    <tr className='border-b last:border-b-0 border-[#EFF3F9]'
                                        key={ index + '' }
                                    >
                                        <td className=' pl-[36px] py-[24px] text-[#54617A]  text-sm font-roboto '>{ item?.villa_name }</td>
                                        <td className='  py-[17px] text-[#54617A] font-roboto text-sm'>{ item?.booking_id }</td>
                                        <td className='  py-[17px] text-[#54617A] font-roboto text-sm pr-8'>
                                            <img src='/img/stars.svg' />
                                        </td>
                                        <td className='  py-[17px] text-[#54617A] font-roboto text-[10px]'>{ item?.description }</td>
                                        <td className='  py-[17px] text-black font-roboto text-sm pl-5'>{ item?.date }</td>
                                        <td className='  py-[17px] text-primary font-medium text-sm cursor-pointer'>  { item?.villa_id } </td>
                                        <td className='  py-[17px] text-success font-medium font-roboto text-sm'>Active</td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>

            </div>
            {/* Table end */ }
        </>
    )
}

export default Reviews