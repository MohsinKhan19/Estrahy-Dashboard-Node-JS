import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Menu from './menu';
import Cross from './Cross'
import LogoutModal from '../../components/Modal'
import { removeCookies } from 'cookies-next';
import { LOGIN_DATA_KEY } from '../../utilis/constants';

const Aside = ({ setShowAside }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);


    const logoutUser = async () => {
        removeCookies(LOGIN_DATA_KEY)
        router.push('/')
    }

    return (
        <>
            <section className='h-screen sidebar overflow-y-auto overflow-x-hidden'>
                <div className='pl-[25px] bg-primaryLight min-w-[285px] overflow-auto'>
                    <div className='flex justify-center cursor-pointer'>
                        <Link href="/dashboard">
                            <img src='/logo.png' alt='Logo' className='w-[192px] h-[85px] my-7' />
                        </Link>
                    </div>
                    <ul className='mt-3'>
                        {Menu?.map((item, index) => (
                            <li className={`mb-6 cursor-pointer ${item?.id == "8" && "border-t pt-6"}`}>
                                <Link href={item?.path} >
                                    <div className='w-full flex gap-4 items-center'>
                                        <div className={`w-[44px] h-[44px] rounded-xl flex justify-center items-center ${router.pathname == item?.path || router?.pathname?.includes(item?.path) ? "bg-primary" : "bg-transparent"}`}>
                                            {router.pathname == item?.path || router?.pathname?.includes(item?.path) ? (
                                                <img src={item?.activeImg} alt={item?.name} />
                                            ) : (
                                                <img src={item?.img} alt={item?.name} />
                                            )}
                                        </div>
                                        <span className={`text-primary text-base ${router.pathname === item?.path || router?.pathname?.includes(item?.path) ? "font-medium" : ""}`}>{item?.name}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li className={`mb-5 cursor-pointer mt-28`}>
                            <Link href="/help_dispute" >
                                <div className='w-full flex gap-4 items-center'>
                                    <div className={`w-[44px] h-[44px] rounded-xl flex justify-center items-center ${router.pathname == "/help_dispute" ? "bg-primary" : "bg-transparent"}`}>
                                        {router.pathname == "/help_dispute" ? (
                                            <img src='/img/helpDispute-active.svg' />
                                        ) : (
                                            <img src='/img/helpDispute.svg' />
                                        )}
                                    </div>
                                    <span className={`text-primary text-base ${router.pathname === 'help_dispute' ? "font-medium" : ""}`}>Help & Dispute</span>
                                </div>
                            </Link>
                        </li>
                        <li className={`mb-5 cursor-pointer`}>
                            <div className='w-full flex gap-4 items-center' onClick={() => setIsOpen(true)}>
                                <div className={`w-[44px] h-[44px] rounded-xl flex justify-center items-center`}>
                                    <img src='/img/logout-icon.svg' className='w-[24px] h-[24px]' />
                                </div>
                                <span className={`text-primary text-base`}>Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div
                    className='absolute top-6 right-5 lg:top-10 lg:right-10 block lg:hidden'
                    onClick={() => setShowAside(false)}
                >
                    <Cross />
                </div>
            </section >
            <LogoutModal isOpen={isOpen} setIsOpen={setIsOpen} className="py-20 w-full lg:w-[837px]">
                <div className='w-full sm:w-[450px] mx-auto flex flex-col justify-center items-center'>
                    <img src='/img/logout.svg' alt='Success' />
                    <h1 className='font-semibold text-[25px] sm:text-[32px] text-primary mt-7'>Are you confirm to logout?</h1>
                    <p className='text-center text-[#5C5C5C] text-base mt-5'>You will need to add your username and password after log out</p>
                    <div className='text-center mt-12 flex gap-10'>
                        <button className='sm:w-[199px] px-7 h-[50px] sm:h-[59px] text-white text-sm sm:text-lg font-light rounded-xl bg-[#474747]'
                            onClick={() => setIsOpen(false)}
                        >Cancel</button>
                        <button className='sm:w-[199px] h-[50px] sm:h-[59px] text-white text-sm sm:text-lg font-light rounded-xl bg-[#F52D56] px-7'
                            onClick={() => {
                                logoutUser()
                                setIsOpen(false)
                            }}
                        >Log out</button>
                    </div>
                </div>
            </LogoutModal>
        </>
    )
}

export default Aside