"use client";
import React from 'react';
import {formatDateTime} from "@/lib/utils";
import {dateTimeFormate} from "@/Types/types";
import Image from "next/image";
import dateIcon from '../../../public/Icons/date.svg'
import balance from '../../../public/Images/account.png'
import Sidebar from "@/Components/Sidebar/Sidebar";
import ShiftToggle from "@/Components/ShiftToggle/ShiftToogle";
import {useSettings} from "@/Context/SettingsContext";
import LanguageToggle from "@/Components/ui/LangToggle";
import {useTranslations} from "use-intl";



function HomeHeader() {
    const {shift} = useSettings();
    const date: dateTimeFormate = formatDateTime(new Date());
    const t = useTranslations('Cart')
    return (
        <>
            <header id='datetime'>
                <div className='flex items-center gap-3'>
                    <Sidebar/>
                    <span className='dateTimeHolder'>
                        <span className='dateTimeIcon'>
                            <Image src={dateIcon} alt='Date icon'/>
                        </span>
                        <span className='dateTimeText'>{date.dateOnly}</span>
                    </span>
                    <span className='dateTimeHolder'>
                        <span className='dateTimeIcon'>
                            <Image src={balance} alt='balance icon'/>
                        </span>
                        <span className='dateTimeText'>{shift?.workingBalance??0} {t("EGP")}</span>
                    </span>
                </div>
                <div className='flex'>
                    <LanguageToggle/>
                    <ShiftToggle/>
                </div>
            </header>
        </>

    );
}

export default HomeHeader;