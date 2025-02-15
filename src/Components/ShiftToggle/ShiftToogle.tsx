'use client'
import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useShift } from '@/hooks/useShift';
import SwitchShiftModal from "@/Components/ShiftToggle/ShiftModal";
import closeIcon from '../../../public/Icons/on-off.svg'
import Image from "next/image";
import { useTranslations } from "use-intl";

const ShiftToggle: React.FC = () => {
    const { state, toggleShift, setPin, setBalance, setRemainingAmount, resetFields } = useShift();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const t = useTranslations('Shift');

    const handleToggleShift = () => {
        resetFields();
        setErrorMessage('');
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {
        setErrorMessage('');
        if (state.pin && state.balance && state.remainingAmount) {
            toggleShift();
            setIsModalOpen(false);
        } else {
            setErrorMessage(t("Please fill in all required fields."));
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        resetFields();
        setErrorMessage('');
    };

    return (
        <div>
            <button
                onClick={handleToggleShift}
                className="shift-toggle-btn bg-white rounded-full"
                style={{
                    padding: '10px 20px',
                    color: state.isShiftSwitched ? '#fc4a4a' : '#1c8370',
                }}
            >
                <div className="shiftToggle">
                    <span>{t("Switch Shift")}</span>
                    <span className="bg-[#f9f9f9] center rounded-full w-[40px] h-[40px]">
                        {state.isShiftSwitched ?
                            <Image src={closeIcon} alt={t('Switch Shift Confirmation')} className='w-[20px] h-[20px]' /> :
                            <FaPlay />
                        }
                    </span>
                </div>
            </button>

            <SwitchShiftModal
                isOpen={isModalOpen}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
                state={state}
                setPin={setPin}
                setBalance={setBalance}
                setRemainingAmount={setRemainingAmount}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default ShiftToggle;
