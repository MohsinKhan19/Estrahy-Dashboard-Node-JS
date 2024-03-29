import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Head from 'next/head';
import BookingModal from '../../../components/Modal/index';

import VillaInformation from '../../../components/villas/VillaInformation';
import VillaOwner from '../../../components/villas/VillaOwner';
import CurrentBookings from '../../../components/villas/CurrentBookings';
import AllBookings from '../../../components/villas/AllBookings';
import Cancelled from '../../../components/villas/Cancelled';
import Transactions from '../../../components/villas/Transactions'
import Dispute from '../../../components/villas/Dispute'
import getHeader from '../../../utilis/getHeader';
import API from '../../../utilis/API';

const index = ({ id }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedTab, setSelectedTab] = useState({});
    const [loading, setloading] = useState(false);
    const [villaImages, setVillaImages] = useState([]);



    useEffect(() => {
        setSelectedTab({
            id: 1,
            name: 'Villa Information'
        })
    }, [])

    const [villaInformations, setVillaInformations] = useState();
    const [vendorOwner, setvendorOwner] = useState();
    const [currentBooking, setcurrentBooking] = useState();
    const [allBookings, setAllBookings] = useState([]);
    const [cancelledBookings, setcancelledBookings] = useState();
    const [transactions, setTransactions] = useState();
    const [disputes, setDisputes] = useState();

    const tabs = [
        {
            id: 1,
            name: 'Villa Information'
        },
        {
            id: 2,
            name: 'Vendor Onwer'
        },
        {
            id: 3,
            name: 'Current Bookings'
        },
        {
            id: 4,
            name: 'All Bookings'
        },
        {
            id: 5,
            name: 'Cancelled'
        },
        {
            id: 6,
            name: 'Transactions'
        },
        {
            id: 7,
            name: 'Dispute'
        },
    ]

    const loadDetailsData = async () => {
        setloading(true)
        try {
            const header = getHeader()
            const { data } = await API.get(`Dashboard/specific/villa/full/detail/${id}`, header)
            console.log('data', data)
            setVillaImages(data?.body?.villa_images)
            setDisputes(data?.body?.disputes?.data)
            setcancelledBookings(data?.body?.cancelled_bookings?.data)
            setcurrentBooking(data?.body?.current_bookings?.data)
            setVillaInformations(data?.body?.villa_info)
            setvendorOwner(data?.body?.villa_owner)
            setAllBookings(data?.body?.all_bookings?.data)
            setloading(false)
        } catch (error) {

            setloading(false)
        }
    }

    useEffect(() => {
        loadDetailsData()
    }, []);


    return (
        <>
            <Head>
                <title>Villa details</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout title="Reservation Details">
                <section className='flex justify-between items-center mt-3 pr-4'>
                    <div>
                        <h1 className='text-[24px] text-black font-sans font-medium'>Villa ID #213213</h1>
                        <p className='text-lightGray text-base py-1 font-sans'>Joining Date: 24 Sept 2022</p>
                        <p className='text-lightGray text-base font-sans flex gap-x-3'>Status
                            <span className='text-success font-semibold'>  Approved</span>
                            <img src='/img/approved.svg' alt='' />
                        </p>
                    </div>
                    {/* <button className='w-[176px] h-[46px] bg-success text-white font-light text-sm rounded-[14px]'>Approve Booking</button> */}
                </section>
                <section className=''>
                    <div className='w-full h-auto py-3 lg:py-0 lg:h-[50px] bg-primaryLight rounded-lg my-7 flex justify-center lg:justify-between flex-wrap gapy-3'>
                        {tabs.map((tab, index) => (
                            <button
                                className={`px-7 h-[50px] rounded-lg text-primary text-xs font-medium transition-colors duration-300 ${selectedTab.id === tab?.id && "text-white bg-primary"}`}
                                onClick={() => setSelectedTab(tab)}
                            >{tab?.name}</button>
                        ))}
                    </div>
                    {selectedTab?.name === "Villa Information" && (
                        <VillaInformation
                            data={villaInformations}
                            villaImages={villaImages}
                        />
                    )}
                    {selectedTab?.name === "Vendor Onwer" && (
                        <VillaOwner
                            data={vendorOwner}
                        />
                    )}
                    {selectedTab?.name === "Current Bookings" && (
                        <CurrentBookings
                            data={currentBooking}
                        />
                    )}
                    {selectedTab?.name === "All Bookings" && (
                        <AllBookings
                            data={allBookings}
                        />
                    )}
                    {selectedTab?.name === "Cancelled" && (
                        <Cancelled
                            data={cancelledBookings}
                        />
                    )}
                    {selectedTab?.name === "Transactions" && (
                        <Transactions />
                    )}
                    {selectedTab?.name === "Dispute" && (
                        <Dispute
                            data={disputes}
                        />
                    )}
                </section>

            </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query
    return {
        props: {
            id: id
        }
    }
}

export default index