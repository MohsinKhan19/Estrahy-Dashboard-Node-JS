import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Layout/Header';
import Loader from '../../components/Loader';
import API from '../../utilis/API';
import getHeader from '../../utilis/getHeader';

const Index = () =>
{

    const [loading, setloading] = useState(false);

    const [payload, setpayload] = useState({
        name: '123',
        phone: '',
        cnic: '',
        address: '',
        dob: '',
        profile_image: ''
    });


    const loadProfileData = async () =>
    {
        setloading(true)
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/my/profile', header)
            // console.log('profile', data)
            setloading(false)
        } catch (error) {
            console.log(data)
            setloading(false)
        }
    }


    const updateProfiledData = async () =>
    {

        setloading(true)
        let formData = new FormData()
        for (const [key, value] of Object.entries(payload)) {

            formData.append(key, value)

        }

        try {
            const header = getHeader(true)
            const { data } = await API.post('Dashboard/update/profile', formData, header)
            console.log('profile update', data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() =>
    {
        updateProfiledData()
        // loadProfileData()
    }, []);

    return (
        <>
            <header className='w-full h-[129px] bg-primaryLight pl-10 pr-6 relative'>
                <Header />
                <Link href="/dashboard">
                    <img src='/img/logo.svg' alt='Logo' className='w-[192px] h-[85px] absolute top-1/2 -translate-y-1/2 cursor-pointer' />
                </Link>
            </header>
            <main className='py-4 px-10 md:w-[92%] ml-auto'>
                <div className='border-b-2 pb-5'>
                    <h1 className='text-2xl font-medium text-misDarkBlack font-sans'>Settings</h1>
                    <p className='text-sm text-lightGray mt-1 font-sans'>Explore all villa reservations here</p>
                </div>
                <section className='lg:flex gap-x-16 my-10'>
                    <div className='flex-1'>
                        <h1 className='text-2xl font-medium text-misDarkBlack font-sans mb-12'>Add User Role</h1>
                        <form>
                            <div className='w-full'>
                                <div className='w-full flex gap-x-8 gap-y-2 lg:gap-x-24 flex-wrap items-center mb-8'>
                                    <label className='font-medium w-[100px]'>Username</label>
                                    <input type="text" className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 text-sm' />
                                </div>
                                <div className='w-full flex gap-x-8 gap-y-2 lg:gap-x-24 items-center flex-wrap mb-8'>
                                    <label className='font-medium w-[100px]'>Password</label>
                                    <input type="password" className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 text-sm' />
                                </div>
                                <div className='w-full flex gap-x-8 gap-y-2 lg:gap-x-24 items-center flex-wrap mb-8'>
                                    <label className='font-medium w-[100px]'>Full Name</label>
                                    <input type="text" className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 text-sm' />
                                </div>
                                <div className='w-full flex gap-x-8 gap-y-2 lg:gap-x-24 items-center flex-wrap mb-8'>
                                    <label className='font-medium w-[100px]'>Email</label>
                                    <input type="text" className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 text-sm' />
                                </div>
                                <div className='w-full flex gap-x-8 gap-y-2 lg:gap-x-24 items-center flex-wrap mb-8'>
                                    <label className='font-medium w-[100px]'>Role Access</label>
                                    <select className='flex-1 h-[42px] rounded-lg border text-sm border-primary px-4 mt-2 sm:mt-0 appearance-none'>
                                        <option selected>Select the user role</option>
                                    </select>
                                </div>
                            </div>
                            <div className='text-right'>
                                <Link href="/dashboard">
                                    <button className='w-[199px] h-[59px] text-lg rounded-xl bg-primary text-white mt-7'>Confirm</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className='flex-1 rounded-lg shadow-[0px_0px_20px_#D7DEE365] overflow-hidden mt-10 md:mt-0'>
                        <header className='w-full h-[73px] bg-primary flex items-center px-6'>
                            <span className='flex-1 text-sm text-white font-light'>Username</span>
                            <span className='flex-1 text-sm text-white font-light'>Full name</span>
                            <span className='flex-1 text-sm text-white font-light'>User Permissions</span>
                            <span className='text-sm text-white pl-10 font-light'>Action</span>
                        </header>
                    </div>
                </section>
            </main>
            { loading && <Loader /> }
        </>
    )
}

export default Index