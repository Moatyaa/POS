import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import avatar from '../../../public/Icons/avatar.png';
import close from '../../../public/Icons/arrow-right.svg';
import { SidebarHeaderProps } from "@/Types/types";
import Cookies from "js-cookie";

// eslint-disable-next-line react/display-name
const SidebarHeader = React.memo(({ isOpen, toggle }: SidebarHeaderProps) => {
    const [userRole, setUserRole] = useState();
    const [userName, setUserName] = useState();
    const storedLang = Cookies.get('MYNEXTAPP_LOCALE');
    useEffect(() => {
        const userData = sessionStorage?.getItem('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            setUserName(parsedData.employee_name)
            if (Array.isArray(parsedData.roles) && parsedData.roles.length > 0) {
                setUserRole(parsedData.roles[0]);
            }
        }
    }, []);

    return (
        <div className='sidebar__header'>
            <div className='userInfo'>
                <div className='userAvatar'>
                    <Image
                        src={avatar}
                        className={`w-[25px] h-[25px]`}
                        alt='Image of The user'
                    />
                </div>
                <div>
                    <h2 className='userName'>{userName}</h2>
                    <p className='userTitle'>{userRole}</p>
                </div>
            </div>
            <div className='closeSideBar group' onClick={() => toggle()}
                 aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}>
                <Image
                    src={close}
                    className={`closeSideBarIcon ${storedLang?? storedLang == "ar" ? "transform rotate-y-180" : ""}`}
                    alt='Close SideBar Icon'
                />
            </div>
        </div>
    );
});

export default SidebarHeader;
