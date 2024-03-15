import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import index from '../Layout';

const NewReservations = ({ data }) => {
    const [cardsData, setCardsData] = useState([
        {
            title: 'New Reservation',
            value: '0',
            color: '#2E3039'
        },
        {
            title: 'Pending',
            value: '0',
            color: '#F52D56'
        },
        {
            title: 'Approved',
            value: '0',
            color: '#08488C'
        }
    ]);

    useEffect(() => {
        setCardsData([
            {
                title: 'New Reservation',
                value: data?.new_reservations,
                color: '#2E3039'
            },
            {
                title: 'Pending',
                value: data?.pending,
                color: '#F52D56'
            },
            {
                title: 'Approved',
                value: data?.approved,
                color: '#08488C'
            }
        ])
    }, [data]);

    return (
        <div className='pt-[30px]'>
            {/* Heading start */}
            <div className='flex flex-row items-center space-x-[35px]'>
                <h1 className='text-xl font-medium text-misDarkBlack'>New Reservations</h1>
                {/* <div className='h-[35px] bg-white w-[158px] rounded-full flex justify-between px-[16px] items-center cursor-pointer'
                    style={ {
                        'boxShadow': '0px 2px 20px #CFD9DF66',
                        'border': '1px solid #EAEDEF',
                        'borderRadius': '25px'
                    } }>
                    <h1 className='text-sm text-[]'>08/21/2018</h1>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div> */}
            </div>
            {/* Heading end */}

            {/* Cards  Start*/}
            <div className='flex flex-row flex-wrap space-x-[24px] mt-[29px]'>
                {
                    Array.isArray(cardsData) && cardsData?.map((item, index) => {
                        return (
                            <div
                                key={index + ''}
                                className='w-[261px] h-[125px] bg-white rounded-[8px] flex flex-col pt-[22px] px-[25px]'
                                style={{
                                    'boxShadow': '0px 0px 20px #D7DEE365'
                                }}
                            >
                                <h1 className={`font-roboto text-[${item?.color}] text-xl font-medium`}>{item?.title}</h1>
                                <h2 className={`font-roboto font-bold text-[${item?.color}] text-2xl mt-[13px]`}>{item?.value}</h2>
                            </div>
                        )
                    })
                }
            </div>
            {/* Cards  End*/}

            {/* Table start */}
            <div
                className='bg-white py-[22px] mt-[28px] rounded-[8px] relative mb-10'
                style={{
                    'boxShadow': '0px 0px 20px #D7DEE365'
                }}
            >
                <div className='flex flex-row items-center justify-between px-[25px]'>
                    <h1 className='font-medium text-[20px] text-[#2E3039]'>New Reservations</h1>
                    <Link href="/reservations">
                        <h1 className='font-roboto text-[#08488C] text-sm cursor-pointer'>Go to Reservation</h1>
                    </Link>
                </div>
                <div className='mt-[20px] '>
                    <table className='table-fixed w-full'>
                        <thead >
                            <tr className='bg-[#08488C]'>
                                <th className='py-[11px] text-xs text-white font-light text-start  pl-[36px] w-[200px]'>VILLA NAME</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>CUSTOMER ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start w-[100px]'>CITY</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>DATE</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>AMOUNT</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>STATUS</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data?.reservation_list?.data) && data?.reservation_list?.data?.map((item, index) => {
                                return (
                                    <tr className='border-b last:border-b-0 border-[#EFF3F9]'
                                        key={index + ''}
                                    >
                                        <td className=' pl-[36px] py-[24px] text-[#54617A]  text-sm font-roboto '>{item?.villa_name}</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>{item?.customer_id}</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm '>{item?.city}</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>{item?.date}</td>
                                        <td className='  py-[24px] text-black font-roboto text-sm'>SR {item?.amount}</td>
                                        <td className={`  py-[24px] ${item?.status == "Confirmed" ? "text-green-500" : item?.status == "Pending" ? "text-yellow-500" : "text-red-500"} font-medium font-roboto text-sm`}>{item?.status}</td>
                                        <td className='  py-[24px] text-[#54617A] font-roboto text-sm cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="#08488C"
                                                class="w-6 h-6">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            {/* Table end */}
        </div>
    );
}

export default NewReservations;
