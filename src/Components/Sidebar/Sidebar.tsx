'use client';
import React from 'react';
import clsx from "clsx";
import SidebarLinks from "@/Components/Sidebar/SidebarLinks";
import SidebarFooter from "@/Components/Sidebar/SidebarFooter";
import SidebarHeader from "@/Components/Sidebar/SidebarHeader";
import useToggle from "@/hooks/useToggle";
import BurgerToggle from "@/Components/Sidebar/BurgerToggle";
import Cookies from "js-cookie";

function Sidebar() {
    const [isOpen, toggle] = useToggle(false);
    const lang = Cookies?.get('MYNEXTAPP_LOCALE');

    return (
        <>
            <section
                id="sidebar"
                className={clsx(
                    'sidebar',
                    {
                        '-left-[300px]': !isOpen,
                        'left-0': isOpen,
                        'right-0': lang == 'ar' && isOpen,
                        '-right-[300px]': lang == 'ar' && !isOpen,
                    }
                )}
            >
                <SidebarHeader isOpen={isOpen} toggle={toggle} />
                <SidebarLinks />
                <SidebarFooter />
            </section>
            <section
                onClick={() => toggle()}
                className={clsx(
                    'overLay',
                    {
                        'w-0': !isOpen,
                        'w-[100%]': isOpen,
                    }
                )}
            />
            <BurgerToggle toggle={toggle} />
        </>
    );
}

export default Sidebar;
