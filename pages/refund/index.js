import React from 'react';
import Layout from '../../components/Layout'
import Search from '../../components/SVGs/Search';
import Link from 'next/link';

const Index = () =>
{
    const dummyData = [
        {
            title: 'All Cancellations',
            value: '120',
            color: '#F52D56'
        },
        {
            title: 'New Request',
            value: '03',
            color: '#2E3039'
        },
    ]
    return (
        <Layout title="Refund & Cancellations" slug="Check and explore all customer users">
            {/* Cards  Start*/ }
            <section className='w-full border-b pb-8'>
                <div className='flex flex-row flex-wrap space-x-[24px] mt-[29px]'>
                    {
                        dummyData?.map((item, index) =>
                        {
                            return (
                                <div
                                    key={ index + '' }
                                    className='w-[209px] h-[135px] bg-white rounded-[8px] flex flex-col pt-[22px] px-[25px]'
                                    style={ {
                                        'boxShadow': '0px 0px 20px #D7DEE365'
                                    } }
                                >
                                    <h1 className={ `font-roboto text-darkBlack text-xl font-medium` }>{ item?.title }</h1>
                                    <h2 className={ `font-roboto font-bold text-[${item?.color}] text-2xl mt-[13px]` }>{ item?.value }</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {/* Search row */ }
            <section className='pt-7'>
                <div className='flex gap-x-12 items-center justify-between'>
                    <div className='w-[448px] h-[48px] rounded-3xl border overflow-hidden flex justify-between'>
                        <input
                            type="text"
                            placeholder='Search customer by name or ID'
                            className='font-sans text-base text-lightGray h-full pl-5 flex-1 placeholder:font-light'
                        />
                        <button className='w-[90px] h-[48px] rounded-3xl bg-primary flex justify-center items-center'>
                            <Search />
                        </button>
                    </div>
                    <div className='flex gap-x-7 items-center'>
                        <p className='text-base text-black'>Search by</p>
                        <div className='w-[158px] h-[35px] relative'>
                            <select
                                className='w-full h-full text-sm text-darkBlack appearance-none rounded-[25px] border border-[#EAEDEF] px-5'
                                style={ { boxShadow: '0px 2px 20px #CFD9DF66' } }
                            >
                                <option selected>By this month</option>
                            </select>
                            <img src='/img/down.svg' alt="down" className='absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[12px]' />
                        </div>
                    </div>
                </div>
            </section>
            {/* End */ }

            {/* Table start */ }
            <div
                className='bg-white py-[22px] mt-[28px] rounded-[8px] relative mb-20'
                style={ {
                    'boxShadow': '0px 0px 20px #D7DEE365'
                } }
            >
                <div className='px-[25px]'>
                    <h1 className='font-medium text-[20px] text-[#2E3039]'>List of Cancelled and Refund Bookings</h1>
                </div>
                <div className='mt-[20px] '>
                    <table className='table-fixed w-full'>
                        <thead >
                            <tr className='bg-[#08488C]'>
                                <th className='py-[11px] text-xs text-white font-light text-start pl-[35px]'>BOOKING ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>CUSTOMER ID</th>
                                <th className='py-[11px] text-xs text-white font-light text-start '>VILLA NAME</th>
                                <th className='py-[11px] text-xs text-white font-light text-start '>AMOUNT</th>
                                <th className='py-[11px] text-xs text-white font-light text-start'>ANSWER</th>
                                <th className='py-[11px] text-xs text-white font-light text-start pl-[25px]'>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            { new Array(5).fill(null).map((item, index) =>
                            {
                                return (
                                    <Link href="/refund/details">
                                        <tr className='border-b last:border-b-0 border-[#EFF3F9] cursor-pointer'>
                                            <td className='py-[12px] text-[#54617A] text-sm pl-[35px] font-roboto '>2223022</td>
                                            <td className=' text-[#54617A] font-roboto text-sm'>#1224322</td>
                                            <td className=' text-success font-roboto text-sm '>Doha Emporium</td>
                                            <td className=' font-medium text-black font-roboto text-sm '>$200,00</td>
                                            <td className=' text-black font-roboto text-xs py-[12px] pr-[30px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet.</td>
                                            <td className=' text-[#F52D56] font-medium font-roboto text-sm pl-[25px]'>Pending</td>
                                        </tr>
                                    </Link>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>

            </div>
            {/* Table end */ }
        </Layout>
    )
}

export default Index