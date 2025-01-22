import React from 'react';
import {formatDateTime} from "@/lib/utils";
import {dateTimeFormate} from "@/Types/types";
import Image from "next/image";
import dateIcon from '../../../public/Icons/date.svg'
import Sidebar from "@/Components/Sidebar/Sidebar";
import ShiftToggle from "@/Components/ShiftToggle/ShiftToogle";
function HomeHeader() {
    const date:dateTimeFormate = formatDateTime(new Date());
    return (
        <>
            <header id='datetime'>
                <div className='flex items-center gap-3'>
                    <Sidebar />
                    <span className='dateTimeHolder'>
                        <span className='dateTimeIcon'>
                            <Image src={dateIcon}  alt='Date icon'/>
                        </span>
                        <span className='dateTimeText'>{date.dateDay.split(',')[0]}, {date.dateOnly}</span>
                    </span>
                </div>
                <ShiftToggle/>
            </header>
        </>

    );
}

export default HomeHeader;