import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from "../images/logo.png"
const Nav = () => {
    const location = useLocation();

    // Function to determine if the link is active
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    return (
        <div className='w-full h-[60px] bg-[#95D2B3] flex justify-between xl:pl-8 xl:pr-8  pr-4 items-center'>
            <div className=' flex justify-start'>
                {/* <h1 className='font-bold text-3xl'>StreamTube</h1> */}
                <img className='xl:w-[200px] xl:h-[90px] lg:w-[200px] lg:h-[90px]  md:w-[200px] md:h-[90px] sm:w-[200px] sm:h-[90px] w-[150px] h-[90px]'  src={Logo} alt='logo.png'/>
            </div>
            <div className='w-auto h-auto'>
                <ul className='w-auto h-auto flex gap-8'>
                    <li>
                        <NavLink exact to="/" className={isActiveLink('/') ? 'text-[#1f3157] font-semibold' : 'text-white'}>
                            Videos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/playlist" className={isActiveLink('/playlist') ? 'text-[#1f3157] font-semibold' : 'text-white'}>
                            Playlist
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
