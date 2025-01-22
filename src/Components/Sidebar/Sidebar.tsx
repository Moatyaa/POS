'use client'
import React from 'react';
import clsx from "clsx";
import SidebarLinks from "@/Components/Sidebar/SidebarLinks";
import SidebarFooter from "@/Components/Sidebar/SidebarFooter";
import SidebarHeader from "@/Components/Sidebar/SidebarHeader";
import useToggle from "@/hooks/useToggle";
import BurgerToggle from "@/Components/Sidebar/BurgerToggle";

function Sidebar() {
    const [isOpen, toggle] = useToggle(false)
    return <>
        <section id="sidebar" className={clsx('sidebar', {'-left-[300px]': !isOpen}, {'left-0': isOpen})}>
                    <SidebarHeader isOpen={isOpen} toggle={toggle}/>
                    <SidebarLinks/>
                    <SidebarFooter/>
        </section>
        <section onClick={()=>toggle()} className={clsx('overLay', {'w-0]': !isOpen}, {'w-[100%]': isOpen})}></section>
        <BurgerToggle toggle={toggle}/>
    </>
}

export default Sidebar;