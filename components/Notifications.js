import { Menu } from '@headlessui/react'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import getHeader from '../utilis/getHeader';
import API from '../utilis/API';

const Notifications = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [loading, setloading] = useState(false);
    const [notificationsList, setNotificationsList] = useState([]);

    const loadNotificationsList = async () => {
        setloading(true)
        try {
            const header = getHeader()
            const { data } = await API.get('Dashboard/notifications/latest', header)

            setNotificationsList(data?.body)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }

    }

    useEffect(() => {
        loadNotificationsList()
    }, []);


    return (
        <Menu>
            <section className='relative'>
                <Menu.Button
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <span
                        className='relative cursor-pointer'>
                        <img src='/img/notification.svg' alt='Notification' />
                        <span className='w-3 h-3 rounded-full bg-danger absolute top-0 -right-1'></span>
                    </span>
                </Menu.Button>
                <Menu.Items
                    className='shadow-[0px_0px_20px_#D7DEE365] absolute top-10 right-0 rounded-[6px] py-4 bg-white px-6 w-[431px] h-[380px] overflow-y-auto z-[99]'
                    style={{
                        display: showNotifications ? "block" : "none"
                    }}
                >
                    <div className='flex flex-col'>
                        <header className='flex justify-between items-center'>
                            <h4 className='font-sans text-xl font-medium text-darkBlack'>Notification</h4>
                            <Link href="/all_notifications">
                                <p className='font-sans text-sm font-medium text-darkBlack cursor-pointer'>See all</p>
                            </Link>

                        </header>
                        <Menu.Item>
                            <div className='mt-2'>
                                {Array.isArray(notificationsList) && notificationsList.map((item, index) => {
                                    let d = new Date(item?.created_at)
                                    let formatedDate = d.toDateString()
                                    return (
                                        <div className='w-full flex flex-row gap-x-4 py-4 border-b'
                                            key={index + ''}
                                        >
                                            <img src='/img/not-img.png' alt='' className='w-[45px] h-[45px] rounded-fuull' />
                                            <div>
                                                <h6 className='text-base font-sans font-medium text-darkBlack'>{item?.title}</h6>
                                                <p className='text-xs font-sans font-medium text-darkBlack'>{item?.content}</p>
                                            </div>
                                            <p className='ml-auto text-xs font-sans font-medium text-darkBlack'>{formatedDate}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </section>
        </Menu>
    )
}

export default Notifications