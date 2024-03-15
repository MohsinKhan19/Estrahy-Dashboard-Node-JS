import Link from 'next/link';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import API from '../../utilis/API';
import getHeader from '../../utilis/getHeader';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const Profile = () => {
    const header = getHeader();
    const [formPayload, setFormPayload] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    })
    const [loading, setLoading] = useState(false);

    const updatePassword = async () => {
        setLoading(true)
        try {
            const { data } = await API.post('Dashboard/change/password', formPayload, header);
            console.log(data);
            if (data?.success) {
                toast(data?.body?.message);
            }
            else if (data?.success == false) {
                toast.error('Field to update password')
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Loader />}
            <Layout title="Update Password">
                <form className='mt-20'>
                    <div className='w-full md:w-[550px] pb-10'>
                        <div className='w-full flex gap-x-12 flex-wrap items-center mb-8'>
                            <label className='font-medium w-[150px]'>Current password</label>
                            <input
                                type="password"
                                className='flex-1  h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                value={formPayload?.current_password}
                                onChange={e => setFormPayload({ ...formPayload, current_password: e.target.value })}
                            />
                        </div>
                        <div className='w-full flex gap-x-12 items-center flex-wrap mb-8'>
                            <label className='font-medium w-[150px]'>New password</label>
                            <input
                                type="password"
                                className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                value={formPayload?.new_password}
                                onChange={e => setFormPayload({ ...formPayload, new_password: e.target.value })}
                            />
                        </div>
                        <div className='w-full flex gap-x-12 items-center flex-wrap mb-8'>
                            <label className='font-medium w-[150px]'>Confirm password</label>
                            <input
                                type="password"
                                className='flex-1 h-[42px] rounded-lg border border-primary px-4 mt-2 sm:mt-0 '
                                value={formPayload?.confirm_password}
                                onChange={e => setFormPayload({ ...formPayload, confirm_password: e.target.value })}
                            />
                        </div>
                        <div className='text-right'>
                            <button
                                onClick={e => {
                                    e.preventDefault()
                                    updatePassword()
                                }}
                                className='w-[150px] h-[42px] rounded-xl bg-primary text-xs text-white uppercase mt-7'>Update</button>
                        </div>
                    </div>

                </form>
            </Layout>
        </>
    )
}

export default Profile;