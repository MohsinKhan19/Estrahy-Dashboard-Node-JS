import React, { useState } from 'react';
import Header from './Header';
import Aside from './Aside';

const index = ({ children, title, slug }) => {
    const [showAside, setShowAside] = useState(false);
    return (
        <>
            <section className='md:flex max-w-full flex-row lg:gap-x-10 bg-primaryExtraLight relative '>
                <div
                    className={`lg:flex-[20] h-screen lg:sticky top-0 w-full z-[999] absolute translate-x-[-100%] lg:translate-x-0 transition-all duration-30 bg-primaryLight ${showAside === true ? "translate-x-0" : "translate-x-[-100%]"} z-10`}
                >
                    <Aside showAside={showAside} setShowAside={setShowAside} />
                </div>
                <div className='lg:flex-[80] w-full pr-3 md:pr-5 px-4 lg:px-0 lg:pr-6'>
                    <div className='w-full'>
                        <Header showAside={showAside} setShowAside={setShowAside} title={title} slug={slug} />
                    </div>
                    <main className='mt-8'>
                        {children}
                    </main>
                </div>
            </section>
        </>
    )
}

export default index