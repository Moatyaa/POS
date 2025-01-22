import React from 'react';
import Sidebar from "@/Components/Sidebar/Sidebar";
import Image from "next/image";
import dateIcon from "../../../public/Icons/date.svg";
import {dateTimeFormate, SubLinksHeaderProps} from "@/Types/types";
import { formatDateTime } from "@/lib/utils";
import ShiftToggle from "@/Components/ShiftToggle/ShiftToogle";


function SubLinksHeader({ subHeaderTitle, activeSubLinkTitle }: SubLinksHeaderProps) {
    const date: dateTimeFormate = formatDateTime(new Date());

    return (
        <section id='subLinksHeader' className='w-[100%] p-[10px]'>
            <div className='flex justify-between items-center w-[100%]'>
                <div className='flex items-center gap-3 font-medium text-[20px]'>
                    <Sidebar />
                    <span className='path'>
                        {subHeaderTitle}
                        {activeSubLinkTitle && (
                            <span className='text-[14px] text-[#b6b6b6]'> / {activeSubLinkTitle}</span>
                        )}
                    </span>

                </div>
                <div className='flex justify-center gap-3'>
                    <span className='dateTimeHolder'>
                        <span className='dateTimeIcon'>
                            <Image src={dateIcon} alt='Date icon' />
                        </span>
                        <span className='dateTimeText'>{date.dateDay.split(',')[0]}, {date.dateOnly}</span>
                    </span>
                    <ShiftToggle />
                </div>
            </div>
        </section>
    );
}

export default SubLinksHeader;
