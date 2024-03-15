import React from 'react'

const VillaInformation = ({ data }) =>
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
                    <h1 className='font-medium text-[20px] text-[#2E3039]'>All Dispute</h1>
                </div>
                <div className='mt-[20px] '>
                    <table className='table-fixed w-full'>
                        <thead >
                            <tr className='bg-[#08488C]'>
                                <th className='py-[11px] text-xs text-white font-light text-start pl-[35px]'>DISPUTE ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>SUBJECT</th>
                                <th className='py-[11px] text-xs text-white font-light text-start '>TYPE</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>ANSWER</th>
                                <th className='py-[11px] text-xs text-white font-light text-start pl-[25px]'>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Array.isArray(data) && data.map((item, index) =>
                            {
                                return (
                                    <tr className='border-b last:border-b-0 border-[#EFF3F9]'
                                        key={ index }
                                    >
                                        <td className='py-[24px] text-[#54617A] text-sm pl-[35px] font-roboto '>{ item?.dispute_id }</td>
                                        <td className=' text-[#54617A] font-roboto text-sm'>{ item?.subject }</td>
                                        <td className=' text-success font-roboto text-sm '>{ item?.type }</td>
                                        <td className='  text-[#54617A] font-roboto text-xs py-[14px] pr-[30px]'>{ item?.answer }</td>
                                        <td className=' text-[#F52D56] font-medium font-roboto text-sm pl-[25px]'>{ item?.status }</td>

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

export default VillaInformation