import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import Search from '../../components/SVGs/Search';
import Link from 'next/link';
import getHeader from '../../utilis/getHeader';
import API from '../../utilis/API';
import Loader from '../../components/Loader';
import PaginationElement from '../../components/PaginationElement';

const Index = () => {
    const header = getHeader();
    const [cardsData, setCardsData] = useState([]);
    const [disputesList, setDisputesList] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('Select');

    // For pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [lastPage, setLastPage] = useState();
    const [loading, setLoading] = useState(false)

    const getDisputesList = async () => {
        setLoading(true)
        try {
            const endPoint = search ? `Dashboard/disputes/all/${search}?page=${pageNumber}` : search && filter ? `Dashboard/disputes/all/${search}/${filter}?page=${pageNumber}` : `Dashboard/disputes/all?page=${pageNumber}`

            const { data } = await API.get(endPoint, header);

            console.log(data);


            if (data?.success === true) {

                setDisputesList(data?.body?.disputes?.data);
                setCardsData([
                    {
                        title: 'All Dispute',
                        value: data?.body?.all_disputes,
                        color: '#F52D56'
                    },
                    {
                        title: 'New Request',
                        value: data?.body?.new_request,
                        color: '#2E3039'
                    },
                    {
                        title: 'Pending',
                        value: data?.body?.pending_disputes,
                        color: '#2E3039'
                    },
                ])

                setLastPage(data?.body?.disputes?.last_page);
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getDisputesList();
    }, [search, pageNumber, filter])

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

    return (
        <>
            {loading && <Loader />}
            <Layout title="Help & Dispute" slug="Check and explore all customer users">
                {/* Cards  Start*/}
                <section className='w-full border-b pb-8'>
                    <div className='flex flex-row flex-wrap space-x-[24px] mt-[29px]'>
                        {
                            cardsData?.map((item, index) => {
                                return (
                                    <div
                                        key={index + ''}
                                        className='w-[209px] h-[135px] bg-white rounded-[8px] flex flex-col pt-[22px] px-[25px]'
                                        style={{
                                            'boxShadow': '0px 0px 20px #D7DEE365'
                                        }}
                                    >
                                        <h1 className={`font-roboto text-darkBlack text-xl`}>{item?.title}</h1>
                                        <h2 className={`font-roboto font-bold text-[${item?.color}] text-2xl mt-[13px]`}>{item?.value}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                {/* Search row */}
                <section className='pt-7'>
                    <div className='flex gap-x-12 items-center justify-between'>
                        <div className='w-[448px] h-[48px] rounded-3xl border overflow-hidden flex justify-between'>
                            <input
                                type="text"
                                placeholder='Search subject name or ID'
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
                            <div className='w-[220px] h-[35px] relative'>
                                <select
                                    className='w-full h-full text-sm text-darkBlack appearance-none rounded-[25px] border border-[#EAEDEF] px-5'
                                    style={{ boxShadow: '0px 2px 20px #CFD9DF66' }}
                                >
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
                    className='bg-white py-[22px] mt-[28px] rounded-[8px] relative mb-20'
                    style={{
                        'boxShadow': '0px 0px 20px #D7DEE365'
                    }}
                >

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
                                {disputesList?.map((item, index) => {
                                    return (
                                        <Link href={`/help_dispute/details/${item?.id}`} key={index + ''}>
                                            <tr className='border-b last:border-b-0 border-[#EFF3F9] cursor-pointer'>
                                                <td className='py-[12px] text-[#54617A] text-sm font-roboto pl-[24px]'>{item?.dispute_subject}</td>
                                                <td className=' text-[#54617A] font-roboto text-sm pl-8'>{item?.id}</td>
                                                <td className=' text-success font-roboto text-sm pr-8'>{item?.dispute_name}</td>
                                                <td className=' text-black font-roboto text-xs py-[12px]'>{item?.dispute_description}</td>
                                                <td className=' font-medium text-black font-roboto text-sm pl-5'>{item?.user_id}</td>
                                                <td className={`font-medium font-roboto ${item?.status == 'Active' ? "text-green-500" : "text-[#F52D56]"} text-sm`}>{item?.status}</td>
                                                <td className={item?.status === 'Active' ? "Resolved" : "Pending"}>
                                                    <img src='/img/edit.svg' alt='' />
                                                </td>
                                            </tr>
                                        </Link>
                                    )
                                })}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <PaginationElement
                            currentPage={pageNumber}
                            callBack={(currentPage) => { setPageNumber(currentPage) }}
                            totalPages={lastPage}
                        />
                    </div>

                </div>
                {/* Table end */}
            </Layout>
        </>
    )
}

export default Index