import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import API from '../utilis/API';
import getHeader from '../utilis/getHeader';

const all_notification = () =>
{

    const [noticationsList, setNoticationsList] = useState([]);
    const [loading, setloading] = useState(false);

    const loadNoticationsList = async () =>
    {
        setloading(true)
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/notifications/all', header)

            setNoticationsList(data?.body?.notifications?.data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() =>
    {
        loadNoticationsList()
    }, []);

    return (
        <>
            <Layout title="All Notifications">
                <section className='py-3'>
                    { Array.isArray(noticationsList) && noticationsList.map((item, index) =>
                    {
                        let d = new Date(item?.created_at)
                        let formateddate = d.toDateString()
                        return (
                            <div className='w-full flex flex-row items-center gap-x-4 py-4'
                                key={ index + '' }
                            >
                                <img src='/img/not-img.png' alt='' className='w-[50px] h-[50px] rounded-fuull' />
                                <div className='flex-1'>
                                    <h6 className='text-lg font-sans font-medium text-darkBlack'>{ item?.title }</h6>
                                    <p className='text-sm font-sans font-medium text-[#2e3039]'>{ item?.content }</p>
                                </div>
                                <p className='text-xs font-sans font-medium text-darkBlack ml-10 w-[100px]'>{ formateddate }</p>
                            </div>
                        )
                    }) }
                </section>
            </Layout>
            { loading && <Loader /> }
        </>
    )
}

export default all_notification