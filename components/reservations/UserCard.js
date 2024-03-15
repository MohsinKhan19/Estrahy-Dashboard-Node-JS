import Link from 'next/link';
import React from 'react'
import getHeader from '../../utilis/getHeader';

const UserCard = ({ title, img, data }) => {
    const date = new Date(data?.last_booking?.created_at);
    const header = getHeader();
    return (
        <div className='w-[333px] rounded-3xl px-6 py-8' style={{ boxShadow: "0px 0px 20px #D7DEE365" }}>
            <h1 className='text-xl font-medium text-primary'>{title}</h1>
            <div className={`w-full flex flex-col items-center ${img ? "mt-10" : "mt-3"}`}>
                {img && (
                    <img src={data?.profile_image} alt='Profile' className='w-[98px] h-[98px] rounded-full object-cover' />
                )}
                <h1 className='text-xl font-medium text-darkBlack mt-3'>{data?.name}</h1>
                <p className='text-xs text-lightGray font-sans font-medium'>{`UserID #${data?.vendor_id}`}</p>
            </div>
            <div className='my-5'>
                <div className='flex justify-between items-center my-4'>
                    <p className='font-light text-lightGray text-sm'>Member Since</p>
                    <p className='w-[100px] text-darkBlack text-sm'>{data?.member_since}</p>
                </div>
                <div className='flex justify-between items-center my-4'>
                    <p className='font-light text-lightGray text-sm'>Total Bookings</p>
                    <p className='w-[100px] text-darkBlack text-sm'>{data?.total_bookings}</p>
                </div>
                <div className='flex justify-between items-center my-4'>
                    <p className='font-light text-lightGray text-sm'>Last Booking</p>
                    <p className='w-[100px] text-darkBlack text-sm'>{date?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center my-4'>
                    <p className='font-light text-lightGray text-sm'>Cancellations</p>
                    <p className='w-[100px] text-darkBlack text-sm'>{data?.cancelled_bookings}</p>
                </div>
            </div>
            <div className={`text-center ${img ? "mt-28" : "mt-8"}`}>
                <Link
                    // href={`/all_users/user_details/${[header?.headers?.Authorization]}/${data?.vendor_id}`}
                    href={`/villa_owners/details/${data?.vendor_id}`}
                >
                    <button className='w-[150px] h-[42px] text-white text-xs rounded-xl bg-primary'>Go to Profile</button>
                </Link>
            </div>
        </div>
    )
}

export default UserCard