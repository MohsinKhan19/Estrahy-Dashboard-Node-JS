import React, { useState, useEffect } from 'react';

const StatsCards = ({ callBack, value }) => {
    const cardsData = [
        {
            title: 'Insights',
            icon: '/img/salesTab.svg',
            activeIcon: '/img/salesTab-active.svg',
            id: 1
        },
        {
            title: 'New Reservations',
            icon: '/img/newReservation.svg',
            activeIcon: '/img/newReservation-active.svg',
            id: 2
        },
        {
            title: 'New Approvals',
            icon: '/img/newApproval.svg',
            activeIcon: '/img/newApproval-active.svg',
            id: 3
        },
        {
            title: 'Sales',
            icon: '/img/salesTab.svg',
            activeIcon: '/img/salesTab-active.svg',
            id: 4
        },
        {
            title: 'Disputes',
            icon: '/img/dispute.svg',
            activeIcon: '/img/dispute-active.svg',
            id: 5
        }
    ]

    return (
        <div className='flex flex-row gap-[38px] flex-wrap border-b-2 pb-10 cursor-pointer'>
            {cardsData.map(item => {
                return (
                    <div
                        key={item.id}
                        onClick={() => callBack(item?.id)}
                        className={`h-[130px] w-full md:w-[130px] ${value !== item?.id ? "bg-primaryLight" : "bg-primary"} rounded-xl flex flex-col items-center justify-center space-y-[15px] pt-[29px] transition-colors duration-500`}>
                        <div className='h-[40px]'>
                            {value !== item?.id ? (
                                <img src={item?.icon} alt={item?.title} />
                            ) : (
                                <img src={item?.activeIcon} alt={item?.title} />
                            )}
                        </div>
                        <h1 className={`text-center text-xs font-medium max-w-[100px]  ${value !== item?.id ? "text-primary" : "text-primaryLight"} `}>{item?.title}</h1>
                    </div>
                )
            })}
        </div>
    );
}

export default StatsCards;
