import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import { LineChart, YAxis, XAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import getHeader from '../../utilis/getHeader';
import API from '../../utilis/API';


const Sales = () => {


    const [SmallcardsData, setSmallcardsData] = useState([
        {
            title: 'Today Sales',
            value: ''
        },
        {
            title: 'This week',
            value: ''
        }
    ]
    );
    const [loading, setloading] = useState(false);
    const [detailsData, setdetailsData] = useState();
    const [cardsdata, setcardsdata] = useState([
        {
            title: 'Total Sales',
            value: '0',
            percentageValue: '0'
        },
        {
            title: 'Earnings',
            value: '0',
            percentageValue: '0'
        },
    ]
    );
    const [reservationCardsData, setReservationCardsData] = useState([]);
    const loadDashboardsales = async () => {
        setloading(true)
        const header = getHeader()
        try {
            const { data } = await API.get('Dashboard/sales', header)
            setdetailsData(data?.body)
            setSmallcardsData(
                [
                    {
                        title: 'Today Sales',
                        value: data?.body?.today_total_sale
                    },
                    {
                        title: 'This week',
                        value: data?.body?.this_week_total_sale
                    }
                ]
            )

            setcardsdata([
                {
                    title: 'Total Sales',
                    value: data?.body?.total_sale,
                    percentageValue: data?.body?.total_sale_percentage

                },
                {
                    title: 'Earnings',
                    value: data?.body?.earnings,
                    percentageValue: data?.body?.earning_percentage
                },
            ])
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    const loadReservationGraphsData = async () => {
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/sales/week_graph', header)
            if (Array.isArray(data?.body?.last_eight_days_data)) {
                let temp = data?.body?.last_eight_days_data?.map((item, index) => {
                    return {
                        "name": item?.day,
                        "uv": item?.total_sale,
                        "pv": data?.body?.previous_eight_days_data[index]?.total_sale,
                        "amt": 24
                    }
                })

                setReservationCardsData(temp)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadDashboardsales()
        loadReservationGraphsData()
    }, []);

    return (
        <Layout title="Sales" slug="Explore all sales transections here">
            <div className='pt-1'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[10px]
                 gap-y-[13px] mt-[28px] pb-4'>
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
                                    <h1 className='text-[#2E3039] text-xl'>{item?.title}</h1>
                                    <h1 className={`${index == 2 ? "text-[#F52D56]" : "text-[#242E42]"}
                                                 text-[24px] font-semibold mt-2 md:mt-[13px]` }>{item?.value}</h1>
                                    {index !== 2 && <>
                                        <div className='flex flex-row items-center  mt-2 md:mt-[18px] space-x-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#03DE73" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="#03DE73" class="w-3 h-3">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                            </svg>

                                            <h1 className={`${index < 2 ? "text-[#03DE73]" : "text-[#F52D56]"} text-sm `}>{item.percentageValue}</h1>
                                        </div>
                                        <h1 className='text-[#54617A] text-xs mt-[7px] opacity-50'>Since last month</h1>
                                    </>
                                    }
                                </div>
                            )
                        })
                    }
                    <div
                        key={"6"}
                        className='flex flex-row flex-wrap sm:flex-nowrap items-start pt-[10px] md:pt-[22px] pb-[14px] md:pb-[28px] bg-white 
                                        rounded-lg px-[15px] md:px-[25px]  col-span-1 md:col-span-2 space-x-4'
                        style={{
                            'boxShadow': '0px 0px 20px #D7DEE365'
                        }}
                    >   <div className=''>
                            <h1 className='text-[#2E3039] text-xl font-roboto font-light'>{'This Month'}</h1>
                            <h1 className={`text-[#242E42] text-[24px] font-semibold mt-2 md:mt-[13px]`}>{detailsData?.total_this_month_sale
                            }</h1>
                        </div>
                        <div className='flex-1 relative h-20'>
                            <ResponsiveContainer>
                                <LineChart
                                    data={Array.isArray(detailsData?.this_month_sale) ? detailsData?.this_month_sale.map((item, i) => {
                                        return {

                                            "name": i + '',
                                            "pv": item?.total_sale,
                                            "amt": 24
                                        }

                                    }) : []}
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
                </div>
            </div>
            <div className='pt-[30px]'>
                {/* Heading start */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-row items-center justify-between space-x-[35px]'>
                        <h1 className='text-xl font-medium text-misDarkBlack'>Sales</h1>
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
                    <Link href="/sales/all_sales">
                        <button className='w-[196px] h-[42px] text-white bg-primary text-xs font-medium rounded-xl'>All Sales Transections</button>
                    </Link>
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
                                        data={reservationCardsData}
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
                                            data={reservationCardsData.map((item, i) => {
                                                return {
                                                    "name": i + '',
                                                    "pv": index == 0 ? item?.pv : item?.uv,
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
                <div className='h-10'></div>
            </div>
        </Layout>
    );
}

export default Sales;
