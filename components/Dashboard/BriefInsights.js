import React, { useState, useEffect } from 'react';
import { LineChart, YAxis, XAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';



const reservationCardsData = [
    {
        "name": "Mon",
        "uv": 6000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Tue",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Wed",
        "uv": 7000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Thu",
        "uv": 5000,
        "pv": 1000,
        "amt": 2000
    },
    {
        "name": "Fri",
        "uv": 4000,
        "pv": 2000,
        "amt": 2181
    },
    {
        "name": "Sun",
        "uv": 9000,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Mon",
        "uv": 6000,
        "pv": 4300,
        "amt": 2100
    }
]

const SmallcardsData = [
    {
        title: 'Total Villas',
        value: '+ 35.52'
    },
    {
        title: 'Total Users',
        value: '155,000'
    },
    {
        title: 'Total Reservations',
        value: '54,000'
    }
]


const BriefInsights = ({ data, graphData }) => {

    const [cardsdata, setCardsData] = useState([]);
    const [smallCards, setSmallCards] = useState([]);

    const [reservationsGraphData, setreservationsGraphData] = useState([]);


    useEffect(() => {
        setCardsData([
            {
                title: 'Reservations',
                value: data?.body?.reservations,
                percentageValue: data?.body?.reservation_percentage + '%',
                trend: data?.body?.reservation_percentage > 0
            },
            {
                title: 'Approvals',
                value: data?.body?.total_approvals,
                percentageValue: data?.body?.total_approval_percentage + '%',
                trend: data?.body?.total_approval_percentage > 0
            },
            {
                title: 'Earnings',
                value: 'SR ' + data?.body?.earnings,
                percentageValue: data?.body?.earning_percentage + '%',
                trend: data?.body?.earning_percentage > 0
            },
            {
                title: 'Growth',
                value: 'SR' + data?.body?.growth,
                percentageValue: data?.body?.growth_percentage + '%',
                trend: data?.body?.growth_percentage > 0
            },
            {
                title: 'Dispute',
                value: data?.body?.total_disputes,
                percentageValue: data?.body?.dispute_percentage + '%',
                trend: data?.body?.dispute_percentage > 0
            }
        ])

        setSmallCards([{
            title: 'Total Villas',
            value: data?.body?.total_villas,
            graphData: data?.body?.villas_graph?.map(item => item?.total_villas)
        },
        {
            title: 'Total Users',
            value: data?.body?.total_user,
            graphData: data?.body?.users_graph?.map(item => item?.total_users)
        },
        {
            title: 'Total Reservations',
            value: data?.body?.total_reservations,
            graphData: data?.body?.reservation_graph?.map(item => item?.total_reservations)
        }])

    }, [data]);

    useEffect(() => {
        if (Array.isArray(graphData?.last_eight_days)) {
            let temp = graphData?.last_eight_days?.map((item, index) => {
                return {

                    "name": item?.day,
                    "uv": item?.total_reservations,
                    "pv": graphData?.previous_eight_days[index]?.total_reservations,
                    "amt": 10

                }
            })
            setreservationsGraphData(temp)
        }

    }, [graphData]);

    return (
        <div className='pt-[30px]'>
            {/* Heading start */}
            <div className='flex flex-row items-center space-x-[35px]'>
                <h1 className='text-xl font-medium text-misDarkBlack'>Brief Insights</h1>
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
            {/* Cards start */}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[10px] gap-y-[13px] mt-[28px]'>
                {
                    cardsdata.map((item, index) => {
                        return (
                            <div
                                key={index + ''}
                                className='flex flex-col pt-[10px] md:pt-[22px] pb-[14px] md:pb-[28px] bg-white rounded-lg pl-[15px] md:pl-[25px]'
                                style={{
                                    'boxShadow': '0px 0px 20px #D7DEE365'
                                }}
                            >
                                <h1 className='text-[#2E3039] text-[20px]'>{item?.title}</h1>
                                <h1 className={`${!item?.trend ? "text-[#F52D56]" : "text-[#242E42]"}
                                                 text-[24px] font-semibold mt-2 md:mt-[13px]` }>{item?.value}</h1>
                                <div className={``}>
                                    <div className='flex flex-row items-center  mt-2 md:mt-[18px] space-x-1'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill={item?.trend ? "#03DE73" : "#F52D56"}
                                            className="w-3 h-3">
                                            <path
                                                fill-rule="evenodd"
                                                d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                                        </svg>
                                        <h1 className={`${item?.trend ? "text-[#03DE73]" : "text-[#F52D56]"} text-sm`}>{item.percentageValue}</h1>
                                    </div>
                                </div>
                                <h1 className='text-[#54617A] text-xs mt-[7px] opacity-50'>Since last month</h1>
                            </div>
                        )
                    })
                }
            </div>
            <div className='grid grid-cols-5 gap-x-[10px] gap-y-[13px] mt-[13px] mb-[100px]'>

                {/* Booking Reservations start */}
                <div className=' bg-white py-[22px] px-[25px] h-[395px] rounded-lg col-span-5 
                                   lg:col-span-3 relative flex flex-col '
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
                                <h1 className='text-[#242E42] font-roboto text-2xl mt-[2px]'>403</h1>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center space-x-[8px]'>
                                <div className='h-[10px] w-[10px] rounded-full' />
                                <h1 className='font-roboto text-[#54617A] text-xs opacity-50'>Previous Week</h1>
                            </div>
                            <div className='flex items-center space-x-[6px]'>
                                <div className='h-[10px] w-[10px] bg-[#CFD9DF] rounded-full' />
                                <h1 className='text-[#242E42] font-roboto text-2xl mt-[2px]'>300</h1>
                            </div>
                        </div>
                    </div>
                    <div className='relative self-stretch flex-1 mt-5'>
                        <ResponsiveContainer>
                            <LineChart
                                data={reservationsGraphData}
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
                {/* Booking Reservations end */}

                <div className='  h-[395px]  col-span-5 lg:col-span-2  justify-between relative
                                 flex flex-col space-y-[12px]'

                >
                    {smallCards?.map((item, index) => {
                        return (
                            <div
                                className='flex-1 bg-white self-stretch rounded-lg flex flex-row relative py-[22px] pl-[25px] pr-[31px] space-x-[10px] '
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
                                            data={Array.isArray(item?.graphData) && item.graphData.map((val, i) => {
                                                return {

                                                    "name": i + '',
                                                    "pv": val,
                                                    "amt": 2400
                                                }

                                            })}
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
            </div>
            {/* Cards end */}
        </div >
    );
}

export default BriefInsights;
