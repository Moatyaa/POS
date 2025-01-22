import { useState } from 'react';
import {UseToggleReturn} from "@/Types/types";


function useToggle(initialState: boolean = true): UseToggleReturn {
    const [isOpen, setIsOpen] = useState<boolean>(initialState);

    const toggle = () => {
        setIsOpen(prev => !prev)
    };
    return [isOpen, toggle];
}

export default useToggle;
