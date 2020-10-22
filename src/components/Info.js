import React from 'react';

const Info = () => {
    const bannerJSON = window.localStorage.getItem('adminBanner') // get edited admin banner
    return(
        <p style= {{
            background: '#888888',
            textAlign: 'center',
            margin: "10 auto"
        }}>{bannerJSON ? bannerJSON : 'Explore new apartments, land estates, house and land, home designs, builders and more.'}</p>
    )
}

export default Info;