import React, { useState, useEffect } from 'react';
import { LineChart, YAxis, XAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import Loader from '../Loader';
// const reservationCardsData = [
//     {
//         "name": "Mon",
//         "uv": 6000,
//         "pv": 2400,
//         "amt": 2400
//     },
//     {
//         "name": "Tue",
//         "uv": 3000,
//         "pv": 1398,
//         "amt": 2210
//     },
//     {
//         "name": "Wed",
//         "uv": 7000,
//         "pv": 9800,
//         "amt": 2290
//     },
//     {
//         "name": "Thu",
//         "uv": 5000,
//         "pv": 1000,
//         "amt": 2000
//     },
//     {
//         "name": "Fri",
//         "uv": 4000,
//         "pv": 2000,
//         "amt": 2181
//     },
//     {
//         "name": "Sun",
//         "uv": 9000,
//         "pv": 3800,
//         "amt": 2500
//     },
//     {
//         "name": "Mon",
//         "uv": 6000,
//         "pv": 4300,
//         "amt": 2100
//     }
// ]


const Sales = ({ data }) => {
    const [SmallcardsData, setSmallcardsData] = useState([
        {
            title: 'Total Sales',
            value: ''
        },
        {
            title: 'This week',
            value: 'SR'
        }
    ]);
    const [reservationsdata, setReservationsdata] = useState([]);

    useEffect(() => {



        let temp1 = []
        let temp2 = []

        if (Array.isArray(data?.body?.last_eight_days_data)) {
            temp1 = data?.body?.previous_eight_days_data?.map((item, index) => {
                return {
                    "name": item?.day,
                    "pv": item?.total_sale,
                    "amt": 2400
                }
            })

            temp2 = data?.body?.last_eight_days_data?.map((item, index) => {
                return {
                    "name": item?.day,
                    "pv": item?.total_sale,
                    "amt": 2400
                }
            })

            let temp3 = temp1?.map((item, index) => {
                return {
                    "name": item?.day,
                    "uv": item?.pv,
                    "pv": temp2[index].pv,
                    "amt": 2000

                }
            })
            setReservationsdata(temp3)
        }
        setSmallcardsData([
            {
                title: 'Total Sales',
                value: 'SR ' + data?.body?.previous_eight_days_total,
                graphData: temp1
            },
            {
                title: 'This week',
                value: 'SR ' + data?.body?.last_eight_days_total,
                graphData: temp2
            }
        ])

    }, [data]);

    return (
        <>
            <div className='pt-[30px] '>
                {/* Heading start */}
                <div className='flex flex-row items-center space-x-[35px]'>
                    <h1 className='text-xl font-medium text-misDarkBlack'>Sales</h1>
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

                {/* Graphs first group start */}
                <div className='grid grid-cols-1 md:grid-cols-3 mt-[31px] gap-x-[29px]'>
                    <div className='col-span-1 md:col-span-2'>
                        <div className=' bg-white py-[22px] px-[25px] h-[395px] rounded-lg flex flex-col'
                            style={{
                                'boxShadow': '0px 0px 20px #D7DEE365'
                            }}
                        >
                            <h1 className='text-[#2E3039] font-medium text-xl'>Booking Reservations</h1>
                            <div className='flex mt-[13px] space-x-[86px] ml-[70px]'>
                                <div>
                                    <div className='flex items-center space-x-[8px]'>
                                        <div className='h-[10px] w-[10px] rounded-full' />
                                        <h1 className='font-roboto text-[#54617A] text-xs opacity-50'>Current Week</h1>
                                    </div>
                                    <div className='flex items-center space-x-[6px]'>
                                        <div className='h-[10px] w-[10px] bg-[#08488C] rounded-full' />
                                        <h1 className='text-[#242E42] font-roboto text-2xl mt-[2px]'>{SmallcardsData[1].value}</h1>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center space-x-[8px]'>
                                        <div className='h-[10px] w-[10px] rounded-full' />
                                        <h1 className='font-roboto text-[#54617A] text-xs opacity-50'>Previous Week</h1>
                                    </div>
                                    <div className='flex items-center space-x-[6px]'>
                                        <div className='h-[10px] w-[10px] bg-[#CFD9DF] rounded-full' />
                                        <h1 className='text-[#242E42] font-roboto text-2xl mt-[2px]'>{SmallcardsData[0].value}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='relative self-stretch flex-1 mt-5'>
                                <ResponsiveContainer>
                                    <LineChart
                                        data={reservationsdata}
                                        width='100%'

                                    >
                                        <CartesianGrid
                                            strokeDasharray="0.5 1" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={{
                                                stroke: '#CFD9DF',
                                                width: 2
                                            }}
                                            tickLine={{ stroke: 'white' }}
                                        />
                                        <YAxis
                                            axisLine={{
                                                stroke: 'white'
                                            }}
                                            tickLine={{
                                                stroke: '#EAF0F4'
                                            }}
                                        />
                                        {/* <Tooltip /> */}
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="pv"
                                            stroke="#707070"
                                            strokeWidth={1.8}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="uv"
                                            stroke="#707070"
                                            strokeWidth={1.5}
                                            strokeDasharray="3 2"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className=' bg-white py-[22px] px-[25px] h-[395px] rounded-lg md:mt-0 mt-6'
                        style={{
                            'boxShadow': '0px 0px 20px #D7DEE365'
                        }}
                    >
                        <h1 className='font-roboto font-light text-[#2E3039] text-[20px]'>Total sales</h1>
                    </div>
                </div>
                {/* Graph second group end */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[82px] mt-6 md:mt-[40px]'

                >
                    {SmallcardsData?.map((item, index) => {
                        return (
                            <div
                                className='flex-1 bg-white self-stretch rounded-lg flex flex-row relative py-[22px] pl-[25px] pr-[31px] space-x-[10px] last:mt-6 md:last:mt-0 '
                                style={{
                                    'boxShadow': '0px 0px 20px #D7DEE365'
                                }}
                                key={index + ''}
                            >
                                <div className='flex flex-col w-[162px] '>
                                    <h1 className='font-roboto font-light text-[#2E3039]'>{item?.title}</h1>
                                    <h1 className='mt-[15px] font-roboto text-[#242E42] font-bold text-2xl'>{item?.value}</h1>
                                </div>
                                <div className='flex-1 relative'>
                                    <ResponsiveContainer>
                                        <LineChart
                                            data={item?.graphData}
                                            width='100%'
                                        >

                                            <Line
                                                type="monotone"
                                                dataKey="pv"
                                                stroke="#61DD9F"
                                                strokeWidth={2.5}
                                                dot={false}
                                            />

                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='h-10'></div>
            </div>

        </>
    );
}

export default Sales;
