import React, { useEffect, useState } from 'react';

const PaginationElement = ({ callBack, totalPages, currentPage }) => {

    const [isNextSelected, setIsNextSelected] = useState(false);
    const [isPreviousSelected, setIsPreviousSelected] = useState(false);

    const pageCountElement = (item, key) => <h1
        className={`${item == currentPage ? "text-[#1A649B] font-bold" : "text-[#393939]"} font-popins-font h-[33px] w-[33px]  text-sm cursor-pointer flex items-center justify-center`}
        key={key}
        onClick={() => {
            callBack(item)
            setIsNextSelected(false)
            setIsPreviousSelected(false)
        }}
    >{item}</h1>

    const showPagesCount = () => {
        const pages = new Array(totalPages).fill(0).map((e, index) => index + 1)
        if (totalPages <= 3) {
            return pages?.map((item, index) => {
                return pageCountElement(item, index + "")
            })
        }
        else if (currentPage <= totalPages - 2) {
            return (<>
                {pageCountElement(currentPage)}
                {pageCountElement(currentPage + 1)}
                <div className='text-[#ABAFB3]'>..</div>
                {pageCountElement(totalPages)}
            </>)
        }
        else {
            return (<>
                {pageCountElement(1)}
                <div className='text-[#ABAFB3]'>..</div>
                {pageCountElement(totalPages - 1)}
                {pageCountElement(totalPages)}
            </>)
        }

    }

    const handlexPrevClick = () => {
        callBack(currentPage - 1)
        setIsPreviousSelected(true)
        setIsNextSelected(false)
    }

    const handleNextClick = () => {
        callBack(currentPage + 1)
        setIsNextSelected(true)
        setIsPreviousSelected(false)
    }

    return (
        <div className='flex items-center justify-end mt-[30px] mr-8'>
            < div className='flex items-center space-x-3 justify-end' >
                {currentPage !== 1 ?
                    <div
                        className='h-[24px] w-[24px] flex items-center justify-center bg-primary cursor-pointer rounded-[4px]'
                        onClick={handlexPrevClick}
                    >
                        <h1
                            className={`${!isPreviousSelected ? "text-[#fff]" : "text-[#1A649B]"} text-sm cursor-pointer`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="w-[15px] h-[15px]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>

                        </h1>
                    </div> : null
                }
                {showPagesCount()}
                {
                    currentPage !== totalPages ? <div
                        className='h-[24px] w-[24px] bg-primary flex items-center justify-center cursor-pointer rounded-[4px]'
                        onClick={handleNextClick}
                        style={{
                            // backgroundColor: isNextSelected ? '#05685B' : '#05685B0D'
                            // color: isPreviousSelected ? '#1A649B' : '#4C4F52'
                        }}
                    >
                        <h1
                            className={`${!isNextSelected ? "text-[#4C4F52]" : "text-[#1A649B]"} text-sm cursor-pointer`}
                            onClick={handleNextClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="w-[15px] h-[15px]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </h1></div> : null
                }
            </div >
        </div >
    );
}

export default PaginationElement;
