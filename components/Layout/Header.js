import Link from 'next/link';
import React, { useState } from 'react'
import { Menu } from '@headlessui/react';
import Bar from './Bar';
import LogoutModal from '../../components/Modal/index';
import Notifications from '../Notifications';
import { removeCookies } from 'cookies-next';
import { LOGIN_DATA_KEY } from '../../utilis/constants';
import { useRouter } from 'next/router';

const Header = ({ title, slug, setShowAside }) => {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const logoutUser = async () => {
        removeCookies(LOGIN_DATA_KEY)
        router.push('/')
    }

    return (
        <>
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
            <header className='w-full pt-10 flex justify-between flex-wrap gap-y-5 sm:gap-y-0 items-center'>
                <div>
                    <h1 className='text-lg md:text-2xl font-medium text-misDarkBlack font-sans'>{title}</h1>
                    <p className='text-sm text-lightGray mt-1'>{slug && slug}</p>
                </div>
                <div className='flex items-center gap-5 pr-4'>
                    <Notifications />
                    <Menu>
                        <div className=' rounded-lg pl-3 relative '>
                            <Menu.Button>
                                <div className='w-full flex gap-3 items-center cursor-pointer' onClick={() => setShowDropdown(!showDropdown)}>
                                    <img src='/img/profile.png' alt='profile' className='w-[40px] h-[40px] mx-auto' />
                                    <p className='text-sm font-semibold text-misDarkBlack'>{"Wali Ullah"}</p>
                                    <img
                                        src='/img/dropdown.svg'
                                        alt='dropddown'
                                        className='ml-0'
                                    />
                                </div>
                            </Menu.Button>
                            <Menu.Items className='w-full sm:w-[192px] shadow-[0px_0px_20px_#D7DEE365] rounded-[6px] py-3 absolute top-full right-5 bg-white px-4 hidden'
                                style={{
                                    display: showDropdown ? "block" : "none"
                                }}
                            >
                                <div className='flex flex-col'>
                                    <Menu.Item>
                                        <Link href="/settings/profile">
                                            <span className='py-2 text-darkBlack text-center text-base cursor-pointer'>My Profie</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link href="/settings/update_password">
                                            <span className='py-2 text-darkBlack text-center text-base cursor-pointer'>Update password</span>
                                        </Link>
                                    </Menu.Item>
                                    {/* <Menu.Item>
                                        <Link href="/settings">
                                            <span className='py-2 text-base text-center text-darkBlack cursor-pointer'>Settings</span>
                                        </Link>
                                    </Menu.Item> */}
                                    <Menu.Item>
                                        <>
                                            <span className='py-2 text-base text-center text-[#F52D56] cursor-pointer' onClick={() => setIsOpen(true)}>Log out</span>
                                        </>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </div>
                    </Menu>
                </div>
            </header>
            <button onClick={() => setShowAside(true)} className="mb-10 mt-3 block lg:hidden">
                <Bar />
            </button>
        </>

    )
}

export default Header