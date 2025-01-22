import React from 'react';
import Image from 'next/image';
import logoutImage from '../../../public/Icons/logout.svg';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import {useUser} from "@/Context/UserContext";

// eslint-disable-next-line react/display-name
const SidebarFooter = React.memo(() => {
    const {logout}= useUser()
    const handleLogout = () => {
        logout()
        sessionStorage.removeItem('refreshToken');
        Cookies.remove('refreshToken');
        redirect('/login')
    };

    return (
        <div className="sidebar__footer">
            <button
                className="footerInfo"
                aria-label="Log out"
                onClick={handleLogout}
            >
                <p className="footerText">Log Out</p>
                <span className="logoutIconHolder">
                    <Image src={logoutImage} alt="Logout Icon" className="w-[15px] h-[15px]" />
                </span>
            </button>
        </div>
    );
});

export default SidebarFooter;
