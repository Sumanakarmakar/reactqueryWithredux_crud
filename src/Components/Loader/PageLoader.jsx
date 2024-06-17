import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

const PageLoader = () => {
    return (
        <>

            <div className='pageloader_custom'>
                <MagnifyingGlass
                    visible={true}
                    height="50vh"
                    width="50vw"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                />
            </div>

        </>
    )
}

export default PageLoader