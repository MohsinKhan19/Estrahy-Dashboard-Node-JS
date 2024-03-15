import React, { useEffect, useState } from 'react'

const CustomPagination = ({ data, currentPageNumber, perpage, setTempArray, callback }) => {

    const [pages, setPages] = useState([]);
    // let currentPageNumber;
    // let perpage;

    let start = perpage * (currentPageNumber - 1)
    let end = perpage * currentPageNumber

    console.log(data.slice(start, end))

    let pagesCount = Math.ceil(data?.length / perpage)

    // useEffect(() => {
    //     setPages(new Array(pagesCount).fill(null).map((__, index) => index + 1))
    // }, [])

    useEffect(() => {
        setTempArray(data?.slice(start, end));
    }, [currentPageNumber])


    return (
        <section className='flex justify-end gap-x-4'>
            <button
                className='w-[24px] h-[24px] bg-primary rounded-[4px] text-white'
            >{"<"}</button>
            {pages?.map((item, index) => {
                return (
                    <button
                        key={index}
                        className={`text-primary text-base ${currentPageNumber == index ? "font-bold bg-red-400" : ""}`}
                        onClick={() => callback(index + 1)}
                    >{item}</button>
                )
            })}
            <button
                className='w-[24px] h-[24px] bg-primary rounded-[4px] text-white'
            >{">"}</button>
        </section>
    )
}

export default CustomPagination