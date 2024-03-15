import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import index from '../Layout';

const Disputes = ({ data }) => {


    const [cardsData, setCardsData] = useState([
        {
            title: 'All Disputes',
            value: '__',
            color: '#2E3039'
        },
        {
            title: 'Pending',
            value: '__',
            color: '#F52D56'
        },
        {
            title: 'Resolved',
            value: '__',
            color: '#08488C'
        }
    ]);
    const [tableData, settableData] = useState([]);

    useEffect(() => {

        setCardsData([
            {
                title: 'All Disputes',
                value: data?.body?.all_disputes,
                color: '#2E3039'
            },
            {
                title: 'Pending',
                value: data?.body?.pending_disputes,
                color: '#F52D56'
            },
            {
                title: 'Resolved',
                value: data?.body?.resolved_disputes,
                color: '#08488C'
            }
        ])
        settableData(data?.body?.disputes?.data)
    }, [data]);

    return (
        <div className='pt-[30px]'>
            {/* Heading start */}
            <div className='flex flex-row items-center space-x-[35px]'>
                <h1 className='text-xl font-medium text-misDarkBlack'>Dispute</h1>
                {/* <div className='h-[35px] bg-white w-[158px] rounded-full flex justify-between px-[16px] items-center cursor-pointer'
                    style={{
                        'boxShadow': '0px 2px 20px #CFD9DF66',
                        'border': '1px solid #EAEDEF',
                        'borderRadius': '25px'
                    }}>
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
                    cardsData?.map((item, index) => {
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
                    <h1 className='font-roboto text-[#08488C] text-sm cursor-pointer'>Go to Reservation</h1>
                </div>
                <div className='mt-[20px] '>
                    <div className='overflow-x-auto'>
                        <table className='table-fixed w-[750px] md:w-full'>
                            <thead >
                                <tr className='bg-[#08488C]'>
                                    <th className='py-[11px] text-xs text-white font-light text-start pl-[24px]'>SUBJECT</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start pl-8'>REQUEST ID</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start pr-8'>TYPE</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start'>DESCRIPTION</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start pl-5'>USER ID</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start'>STATUS</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start'>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.map((item, index) => {
                                    return (
                                        <Link href={`/help_dispute/details/${item?.id}`} key={index}>
                                            <tr className='border-b last:border-b-0 border-[#EFF3F9] cursor-pointer'>
                                                <td className='py-[12px] text-[#54617A] text-sm font-roboto pl-[24px]'>{item?.dispute_subject}</td>
                                                <td className=' text-[#54617A] font-roboto text-sm pl-8'>{item?.id}</td>
                                                <td className=' text-success font-roboto text-sm pr-8'>{item?.dispute_name}</td>
                                                <td className=' text-black font-roboto text-xs py-[12px]'>{item?.dispute_description}</td>
                                                <td className=' font-medium text-black font-roboto text-sm pl-5'>{item?.user_id}</td>
                                                <td className={` ${item?.status == 'Active' ? "text-green-500" : item?.status == 'Pending' ? "text-yellow-500" : "text-[#F52D56]"} font-medium font-roboto text-sm`}>{item?.status}</td>
                                                <td className='text-sm'>
                                                    <img src='/img/edit.svg' alt='' />
                                                </td>
                                            </tr>
                                        </Link>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>

                </div>

            </div>
            {/* Table end */}
        </div>
    );
}


export default Disputes;

