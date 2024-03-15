import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import PaginationElement from '../../components/PaginationElement';
import API from '../../utilis/API';
import getHeader from '../../utilis/getHeader';

const AllSales = () => {
    const header = getHeader();
    const [salesList, setSalesList] = useState([]);

    // For pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [lastPage, setLastPage] = useState();
    const [loading, setLoading] = useState(false)


    const getSalesList = async () => {
        setLoading(true)
        try {
            const { data } = await API.get(`/Dashboard/all/sales?page=${pageNumber}`, header);

            if (data?.success === true) {
                setSalesList(data?.body?.sales?.data);

                setLastPage(data?.body?.sales?.last_page);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getSalesList();
    }, [pageNumber])

    return (
        <>
            {loading && <Loader />}
            <Layout title="Sales Details" slug="Explore all sales transections here">
                {/* Table start */}
                <div
                    className='bg-white py-[22px] mt-16 rounded-[8px] relative mb-20'
                    style={{
                        'boxShadow': '0px 0px 20px #D7DEE365'
                    }}
                >
                    <div className='px-[25px]'>
                        <h1 className='font-medium text-[20px] text-[#2E3039]'>All SALES</h1>
                    </div>
                    <div className='mt-[20px] overflow-x-auto'>
                        <table className='table-fixed w-[750px] md:w-full'>
                            <thead >
                                <tr className='bg-[#08488C]'>
                                    <th className='py-[11px] text-xs text-white font-light text-start  pl-[36px] w-[200px]'>BOOKING ID</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start'>VILLA ID</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start w-[100px]'>DATE</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start pl-[24px]'>AMOUNT</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start'>TAX</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start'>EARNING</th>
                                    <th className='py-[11px] text-xs text-white font-light text-start'>TOTAL STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesList?.map((item, index) => {
                                    return (
                                        <tr className='border-b last:border-b-0 border-[#EFF3F9]'>
                                            <td className=' pl-[36px] py-[18px] text-[#54617A]  text-sm font-roboto '>{item?.booking_id}</td>
                                            <td className='  py-[18px] text-[#54617A] font-roboto text-sm'>{item?.villa_id}</td>
                                            <td className='  py-[18px] text-[#54617A] font-roboto text-sm '>{item?.date}</td>
                                            <td className='  py-[18px] text-[#54617A] font-roboto text-sm pl-[24px]'>{item?.total}</td>
                                            <td className='  py-[18px] text-[#54617A] font-roboto text-sm'>{item?.tax}</td>
                                            <td className='  py-[18px] text-black font-medium font-roboto text-sm'>{item?.earnings}</td>
                                            <td className='  py-[18px] text-[#00B55D] font-medium text-sm cursor-pointer'>
                                                {item?.status}
                                            </td>
                                        </tr>
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
        </>
    )
}

export default AllSales