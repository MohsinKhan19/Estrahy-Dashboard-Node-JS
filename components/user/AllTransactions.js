import React, { useState } from 'react'
import CustomPagination from '../../utilis/CustomPagination'
import index from '../Layout';

const VillaInformation = () => {
    const [tempArray, setTempArray] = useState(new Array(100).fill(null).map((__, index) => index + 1));
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(10);
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
                    <h1 className='font-medium text-[20px] text-[#2E3039]'>All Transactions</h1>
                </div>
                <div className='mt-[20px] '>
                    <table className='table-fixed w-full'>
                        <thead >
                            <tr className='bg-[#08488C]'>
                                <th className='py-[11px] text-xs text-white font-light text-start  pl-[36px] w-[200px]'>NAME OF DESCRIPTION</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>TRANS ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start w-[100px]'>TYPE</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>DATE</th>
                                <th className='py-[11px] text-xs text-white font-light text-start pl-8'>AMOUNT</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>TAX</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tempArray.map((item, index) => {
                                return (
                                    <tr className='border-b last:border-b-0 border-[#EFF3F9]' key={index}>
                                        <td className=' pl-[36px] py-[24px] text-[#54617A]  text-sm font-roboto '>Pocket Drone 2.4G</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>#1224322</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm '>Riyadh</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>07 to -09 April 2018</td>
                                        <td className='  py-[24px] text-black font-roboto text-sm pl-8'>$129.99</td>
                                        <td className='  py-[24px] text-primary font-medium text-sm cursor-pointer'>
                                            233432
                                        </td>
                                        <td className='  py-[24px] text-success font-medium font-roboto text-sm'>Completed</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <CustomPagination
                    data={tempArray}
                    currentPageNumber={currentPageNumber}
                    perpage={perPage}
                    setTempArray={setTempArray}
                    callback={() => setCurrentPageNumber()}

                />
            </div>
            {/* Table end */}
        </>
    )
}

export default VillaInformation