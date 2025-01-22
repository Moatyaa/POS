import React from 'react';
import Image from "next/image";
import hamburger from '../../../public/Icons/hamburger.svg'
import {BurgerToggleProps} from "@/Types/types";
// eslint-disable-next-line react/display-name
const BurgerToggle = React.memo(({toggle}:BurgerToggleProps)=> {
    return (
        <div onClick={()=> toggle()} className='burgerToggleHolder'>
            <Image src={hamburger} className='w-[25px] h-[25px]' alt='Hamburger icon for open sidebar'/>
        </div>
    );
})

export default BurgerToggle;