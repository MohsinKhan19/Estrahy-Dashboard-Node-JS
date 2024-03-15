import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Head from 'next/head';
import UserCard from '../../../components/reservations/UserCard';
import Link from 'next/link';
import getHeader from '../../../utilis/getHeader';
import Loader from '../../../components/Loader';
import API from '../../../utilis/API'
import { toast } from 'react-toastify';


const index = ({ id }) => {
    const [disputeDetails, setDisputeDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const header = getHeader()

    const loadDetailsData = async () => {
        setLoading(true)
        try {
            const { data } = await API.get(`Dashboard/disputes/detail/${id}`, header)
            console.log(data?.body)
            setDisputeDetails(data?.body)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadDetailsData()
    }, []);

    const approveRequest = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await API.get(`Dashboard/resolve_dispute/${id}`, header);
            console.log("Approve request: ", data);
            if (data?.success == true) {
                loadDetailsData();
                toast(data?.body?.message);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    // All commented sections in the page removed by backend developer --- Basit ----

    return (
        <>
            {loading && <Loader />}
            <Head>
                <title>Dispute Details</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout title="Dispute Details">
                <section className='pr-4 pb-7'>
                    <div className='flex justify-between items-center mt-3'>
                        <div>
                            <h1 className='text-[24px] text-black font-sans font-medium'>Dispute ID: {disputeDetails?.dispute_id}</h1>
                            <p className='text-lightGray text-base py-1 font-sans'>Joining Date: {disputeDetails?.user_since}</p>
                            <p className='text-lightGray text-base font-sans'>Status <span className='text-danger font-semibold'>  {disputeDetails?.Active}</span></p>
                        </div>
                    </div>
                    <div className='md:flex flex-wrap justify-center md:justify-between mt-10'>
                        <div className=''>
                            <h4 className='text-xl text-darkBlack font-medium'>More Information</h4>
                            <div className='mt-5'>
                                <div className='flex mb-3'>
                                    <p className='text-[#6C7A87] font-light text-base sm:w-[250px]'>Request by</p>
                                    <p className='text-black text-base'>{disputeDetails?.request_by}</p>
                                </div>
                                <div className='flex mb-3'>
                                    <p className='text-[#6C7A87] font-light text-base sm:w-[250px]'>About User</p>
                                    <p className='text-primary font-semibold text-base'>{disputeDetails?.about_user}</p>
                                </div>
                                <div className='flex mb-3'>
                                    <p className='text-[#6C7A87] font-light text-base sm:w-[250px]'>Name of user</p>
                                    <p className='text-black text-base'>{disputeDetails?.request_by}</p>
                                </div>
                                <div className='flex mb-3'>
                                    <p className='text-[#6C7A87] font-light text-base sm:w-[250px]'>User ID</p>
                                    <p className='text-black text-base'>{disputeDetails?.user_id}</p>
                                </div>
                                <div className='flex mb-5'>
                                    <p className='text-[#6C7A87] font-light text-base sm:w-[250px]'>Status</p>
                                    <p className='text-black font-medium text-base'>{disputeDetails?.status}</p>
                                </div>
                                <div className='flex mb-5'>
                                    <p className='text-[#6C7A87] font-light text-base sm:w-[250px]'>Subject</p>
                                    <p className='text-black font-medium text-base'>{disputeDetails?.subject}</p>
                                </div>
                                <div className='flex mb-3'>
                                    <p className='text-[#6C7A87] font-light text-base sm:w-[250px]'>Description</p>
                                    <p className='text-black text-base md:w-[391px] font-light'>{disputeDetails?.description}</p>
                                </div>
                                {/* <div className='flex mb-3 mt-10'>
                                    <p className='text-lg text-darkBlack font-medium w-[250px]'>Actions</p>
                                    <div>
                                        <div className='w-[192px] h-[35px] relative'>
                                            <select
                                                className='w-full h-full text-sm text-darkBlack appearance-none rounded-[25px] border border-[#94BAD4] px-5'
                                                style={{ boxShadow: '0px 2px 20px #CFD9DF66' }}
                                            >
                                                <option selected>Approve Request</option>
                                            </select>
                                            <img src='/img/down.svg' alt="down" className='absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[12px]' />
                                        </div>
                                        <p className='text-xs text-black font-medium mt-3 w-[350px]'>Select action and it will notify the vendor and system listing automatically</p>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                        {/* Booking details card */}
                        {/* <div className='w-[340px] h-[600px] rounded-3xl px-6 py-8 flex flex-col justify-between' style={{ boxShadow: "0px 0px 20px #D7DEE365" }}>
                            <div>
                                <h1 className='text-xl font-medium text-primary'>Note the response</h1>
                                <p className='text-xs text-black mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </div>
                            <div>
                                <textarea className='w-full border border-[#ABD4FF] rounded-[10px] resize-none p-5' rows={3}></textarea>
                                <div className='flex justify-end mt-3'>
                                    <button
                                        className='w-[109px] h-[46px] bg-success text-white font-light text-sm rounded-[14px]'
                                    >Save note</button>
                                </div>
                            </div>

                        </div> */}
                        {/* End */}

                    </div>
                    <div className='flex gap-x-10 mt-20'>
                        <Link href="/villas/details">
                            <button
                                className='w-[176px] h-[46px] bg-success text-white font-light text-sm rounded-[14px]'
                                onClick={approveRequest}
                            >Approve Request</button>
                        </Link>
                        <button className='w-[176px] h-[46px] bg-[#AEC4DB] text-white font-light text-sm rounded-[14px]'>Cancel</button>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default index;

export const getServerSideProps = async (context) => {
    const id = context?.params?.id;
    return {
        props: { id: id }
    }
}