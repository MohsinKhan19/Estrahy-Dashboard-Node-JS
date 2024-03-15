import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Search from '../../components/SVGs/Search';
import Link from 'next/link';
import getHeader from '../../utilis/getHeader';
import API from '../../utilis/API';
import Loader from '../../components/Loader';
import PaginationElement from '../../components/PaginationElement';
import baseURL from '../../utilis/baseURL';

const Index = () => {

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('Select');
    const [loading, setloading] = useState(false);
    const [usersData, setusersData] = useState();
    const [cardsdata, setcardsdata] = useState([])
    const [usersDataFile, setUsersDataFile] = useState(null);
    const header = getHeader()

    // For pagination
    const [pageNumber, setPageNumber] = useState(2)
    const [lastPage, setLastPage] = useState();

    const loadUsersList = async () => {
        try {
            const header = getHeader()

            const endPoint = search ? `Dashboard/users/all/${search}?page=${pageNumber}` : search && filter ? `Dashboard/users/all/${search}/${filter}?page=${pageNumber}` : `Dashboard/users/all?page=${pageNumber}`

            const { data } = await API.get(endPoint, header)
            console.log(data);


            setusersData(data?.body?.user_list?.data)
            setcardsdata([{
                title: 'All Customers',
                value: data?.body?.all_customers,
                percentageValue: data?.body?.all_customers_percentage + '%'

            },
            {
                title: 'New customers',
                value: data?.body?.new_customers,
                percentageValue: data?.body?.new_customers_percentage + '%'
            },])

            setLastPage(data?.body?.user_list?.last_page);

        } catch (error) {
            console.log(error)
        }
    }

    const filterOptions = [
        {
            label: 'This month',
            value: 'this_month'
        },
        {
            label: 'Previous month',
            value: 'previous_month'
        },
        {
            label: 'Previous three months',
            value: 'previous_three_months'
        },
        {
            label: 'Previous six months',
            value: 'previous_six_months'
        },
        {
            label: 'Last year',
            value: 'last_year'
        },
    ]


    useEffect(() => {
        loadUsersList()
    }, [search, filter, pageNumber]);

    return (
        <>
            <Layout title="All Customers" slug="Check and explore all customer users">
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[10px] gap-y-[13px] mt-[28px] pb-7 border-b-2'>
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
                                    <h1 className={`"text-[#242E42]" text-[24px] font-semibold mt-2 md:mt-[13px]`}>{item?.value}</h1>
                                    {index !== 2 && <>
                                        <div className='flex flex-row items-center  mt-2 md:mt-[18px] space-x-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#03DE73" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03DE73" class="w-3 h-3">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                            </svg>

                                            <h1 className={`text-[#03DE73] text-sm `}>{item.percentageValue}</h1>
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
                            <h1 className={`text-[#242E42] text-[24px] font-semibold mt-2 md:mt-[13px]`}>+35.52</h1>
                        </div>
                        <div className='flex-1 relative h-20'>
                            <ResponsiveContainer>
                                <LineChart
                                    data={new Array(16).fill(null).map((item, i) => {
                                        return {

                                            "name": i + '',
                                            "pv": 1000 + Math.random() * 10000 * i + 300 * i,
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
                </div>
                {/* Search row */}
                <section className='pt-7'>
                    <div className='flex gap-x-12 items-center justify-between'>
                        <div className='w-[448px] h-[48px] rounded-3xl border overflow-hidden flex justify-between'>
                            <input
                                type="text"
                                placeholder='Search customer by name or ID'
                                className='font-sans text-base text-lightGray h-full pl-5 flex-1 placeholder:font-light'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className='w-[90px] h-[48px] rounded-3xl bg-primary flex justify-center items-center'>
                                <Search />
                            </button>
                        </div>
                        <div className='flex gap-x-7 items-center'>
                            <p className='text-base text-black'>Search by</p>
                            <div className='w-[222px] h-[35px] relative'>
                                <select
                                    className='w-full h-full text-sm text-darkBlack appearance-none rounded-[25px] border border-[#EAEDEF] px-5'
                                    style={{ boxShadow: '0px 2px 20px #CFD9DF66' }}
                                >
                                    {/* <option selected disabled>This month</option> */}
                                    {filterOptions.map((item, key) => (
                                        <option
                                            id={item?.value}
                                            onChange={() => setFilter(item?.value)}
                                        >{item?.label}</option>
                                    ))}
                                </select>
                                <img src='/img/down.svg' alt="down" className='absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[12px]' />
                            </div>
                        </div>
                    </div>
                </section>
                {/* End */}

                {/* Table start */}
                <div
                    className='bg-white py-[22px] mt-8 rounded-[8px] relative mb-20'
                    style={{
                        'boxShadow': '0px 0px 20px #D7DEE365'
                    }}
                >
                    <div className='px-[25px] flex justify-between items-center'>
                        <h1 className='font-medium text-[20px] text-[#2E3039]'>All USERS ( Customers)</h1>
                        <a href={`${baseURL}users/data`} download target="_blank">
                            <button className='px-5 py-2 text-sm rounded-lg text-primary font-medium border border-primary'
                            >Download user data</button>
                        </a>
                    </div>
                    <div className='mt-[20px] '>
                        <table className='table-fixed w-full'>
                            <thead >
                                <tr className='bg-[#08488C]'>
                                    <th className='py-[11px] text-xs text-white font-light text-start  pl-[36px] w-[200px]'>CUSTOMER NAME</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start w-[100px]'>CUSTOMER ID</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start w-[100px]pr-[24px]'>EMAIL</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start  '>CONTACT NO</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start w-[100px]'>NUMBER OF BOOKINGS</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start pl-8'>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData?.map((item, index) => {
                                    return (
                                        <Link
                                            href={`/all_users/user_details/${[header?.headers?.Authorization]}/${[item?.id]}`}
                                            key={index + ''}
                                        >
                                            <tr className='border-b last:border-b-0 cursor-pointer border-[#EFF3F9]'>
                                                <td className=' pl-[36px] py-[24px] text-[#54617A]  text-sm font-roboto '>{item?.name}</td>
                                                <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>{item?.id}</td>
                                                <td className='  py-[24px] text-[#54617A] font-roboto  pr-[24px] text-sm '>{item?.email}</td>
                                                <td className='  py-[24px] text-[#54617A] font-roboto text-sm pl-[24px]'>{item?.phone}</td>
                                                <td className='  py-[24px] text-[#54617A] font-roboto text-sm'>{item?.total_bookings}</td>
                                                <td className='  py-[24px] text-[#00B55D] font-medium text-sm cursor-pointer pl-8'>
                                                    {'Approved'}
                                                </td>
                                            </tr>
                                        </Link>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <PaginationElement
                        currentPage={pageNumber}
                        callBack={(currentPage) => { setPageNumber(currentPage) }}
                        totalPages={lastPage}
                    />
                </div>
                {/* Table end */}
            </Layout>
            {loading && <Loader />}
        </>
    )
}

export default Index