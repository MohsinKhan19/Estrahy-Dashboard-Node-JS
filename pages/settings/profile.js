import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import API from '../../utilis/API';
import getHeader from '../../utilis/getHeader';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Edit from '../../components/SVGs/Edit';

const Profile = () => {
    const header = getHeader();
    const [profileData, setProfileData] = useState({
        name: '',
        phone: '',
        cnic: '',
        dob: '',
        address: '',
        // profile_image: '',
    })
    const [userImage, setUserImage] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const getProfileData = async () => {
        try {
            const { data } = await API.get('Dashboard/my/profile', header);
            if (data.success) {
                console.log(data);
                setProfileData({
                    ...profileData,
                    name: data?.body?.name,
                    phone: data?.body?.phone,
                    cnic: data?.body?.cnic,
                    dob: data?.body?.dob,
                    address: data?.body?.address
                });
                setUserImage(data?.body?.profile_image)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfile = async () => {
        setLoading(true)
        try {
            const { data } = await API.post('Dashboard/update/profile', profileData, header);
            console.log(data);
            if (data?.success == true) {
                toast(data?.body?.message)
                getProfileData();
            }
            else if (data?.success == false && data?.error) {
                toast.error(data?.error)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProfileData();
    }, [])
    return (
        <>
            {loading && <Loader />}
            <Layout title="Update Profile">
                <div className='w-[129px] h-[129px] relative'>
                    {/* <img src='/img/profile.png' alt='' className='w-full h-full rounded-full' /> */}
                    {/* <span
                        className='absolute top-[70%] right-0 bg-white p-1 rounded-full'
                        style={{ boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.1)" }}
                    >
                        <Edit />
                    </span> */}
                    {userImage ? (
                        <div className='relative border-none'>
                            <div className=''>
                                <img src={userImage} className='w-[102px] h-[102px] rounded-full border border-primary object-cover ' />
                            </div>
                            {/* Change image container */}
                            <div
                                className='w-[102px] h-[102px] rounded-full flex items-end p-4 justify-center text-center cursor-pointer absolute top-0 border-none'
                            >
                                <input
                                    type="file"
                                    className='hidden'
                                // onChange={(e) => {
                                //     setImageChanged(true)
                                //     updateImage(e);
                                // }}
                                />
                                <div className=''>
                                    <Edit />
                                    <span className='flex-1 text-white text-xs'>Change</span>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <label
                            className='w-[102px] h-[102px] rounded-full bg-yellow-200 flex items-end p-4 justify-center mt-1 overflow-hidden text-center relative cursor-pointer'
                        >
                            <input
                                type="file"
                                className='hidden'
                                onChange={(e) => setImage(e.target.files[0])}
                            // onChange={(e) => console.log(e.target.files[0])}
                            />
                            <div className='text-center'>
                                <div className='flex justify-center'>
                                    <Edit />
                                </div>
                                <span className='flex-1 text-darkGray underline text-xs font-medium'>{image ? image?.name : 'Upload'}</span>
                            </div>
                        </label>
                    )}
                    <form className='mt-12'>
                        <div className='w-full md:w-[550px] pb-10'>
                            <div className='w-full flex gap-x-12 flex-wrap items-center mb-8'>
                                <label className='font-medium w-[130px]'>Name</label>
                                <input
                                    type="text"
                                    className='flex-1  h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                    value={profileData?.name}
                                    onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                                />
                            </div>
                            <div className='w-full flex gap-x-12 items-center flex-wrap mb-8'>
                                <label className='font-medium w-[130px]'>Phone number</label>
                                <input
                                    type="text"
                                    className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                    value={profileData?.phone}
                                    onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                                />
                            </div>
                            <div className='w-full flex gap-x-12 items-center flex-wrap mb-8'>
                                <label className='font-medium w-[130px]'>CNIC</label>
                                <input
                                    type="text"
                                    className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                    value={profileData?.cnic}
                                    onChange={e => setProfileData({ ...profileData, cnic: e.target.value })}
                                />
                            </div>
                            <div className='w-full flex gap-x-12 items-center flex-wrap mb-8'>
                                <label className='font-medium w-[130px]'>Address</label>
                                <input
                                    type="text"
                                    className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                    value={profileData?.address}
                                    onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                                />
                            </div>
                            <div className='w-full flex gap-x-12 items-center flex-wrap mb-8'>
                                <label className='font-medium w-[130px]'>Date of birth</label>
                                <input
                                    type="text"
                                    className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                    value={profileData?.dob}
                                    onChange={e => setProfileData({ ...profileData, dob: e.target.value })}
                                />
                            </div>
                            <div className='text-right'>
                                <button
                                    onClick={e => {
                                        e.preventDefault()
                                        updateProfile()
                                    }}
                                    className='w-[150px] h-[42px] rounded-xl bg-primary text-xs text-white uppercase mt-7'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default Profile;