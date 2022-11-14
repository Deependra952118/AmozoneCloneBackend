import React from 'react'
import './newnav.css'

const newnav = () => {
    return (
        <div className='new_nav'>
            <div className='nav_data'>
                <div className='left_data'>
                    <p>All</p>
                    <p>Mobile</p>
                    <p>BestSeller</p>
                    <p>Fashion</p>
                    <p>Customer Services</p>
                    <p>Electronics</p>
                    <p>Prime</p>
                    <p>Today's Deal</p>
                    <p>Amazon Pay</p>
                </div>
                <div className='right_data'>
                    <img src='https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/nav.jpg' alt='navdata'></img>
                </div>
            </div>
        </div>
    )
}

export default newnav
