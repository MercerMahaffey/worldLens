import React from 'react';
import Header from './Header';

const BaseLayout = ({children}) => {
    return (
        <>
            <div className="container-fluid">
                <Header />
                {children}
            </div>
        </>
    )
}

export default BaseLayout
