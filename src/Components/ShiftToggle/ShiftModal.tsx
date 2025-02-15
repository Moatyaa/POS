import React, { useRef } from 'react';
import { Form, Input } from 'antd';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/Components/ui/input-otp";
import CustomModal from "@/Components/CustomModal/CustomModal";
import { ShiftModalProps } from "@/Types/types";
import {useTranslations} from "use-intl";

const SwitchShiftModal: React.FC<ShiftModalProps> = ({
                                                         isOpen,
                                                         onConfirm,
                                                         onCancel,
                                                         state,
                                                         setPin,
                                                         setBalance,
                                                         setRemainingAmount,
                                                         errorMessage,

                                                     }) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const t = useTranslations('Shift')
    return (
        <CustomModal
            modalOpen={isOpen}
            setModalOpen={onCancel}
            title={t("Switch Shift Confirmation")}
            content={
                <div className='shiftModal'>
                    <div className='inputs mt-5'>
                        <Form>
                            <Form.Item
                                label={t("Your Shift Balance")}
                                rules={[{ required: true, message: 'Please input the Balance!' }]}
                            >
                                <Input
                                    onChange={(e) => setBalance(e.target.value)}
                                    value={state.balance}
                                />
                            </Form.Item>
                        </Form>

                        <Form>
                            <Form.Item
                                label={t("Remaining Amount")}
                                rules={[{ required: true, message: 'Please input the remaining amount!' }]}
                            >
                                <Input
                                    onChange={(e) => setRemainingAmount(e.target.value)}
                                    value={state.remainingAmount}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='pin'>
                        <InputOTP
                            ref={ref}
                            maxLength={6}
                            onChange={(value) => setPin(value)}
                            value={state.pin}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <label className='mt-3'>{t("Enter Your PIN")}</label>
                    </div>
                    {errorMessage && <div className="shiftModal_alert">{errorMessage}</div>}
                    <button className="modalBtn ant-btn " onClick={onConfirm}>
                        {t("Switch Shift")}
                    </button>
                </div>
            }
        />
    );
};

export default SwitchShiftModal;
