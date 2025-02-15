import React, {useState} from 'react';
import CustomModal from "@/Components/CustomModal/CustomModal";
import Cookies from "js-cookie";
import {toast, Toaster} from "react-hot-toast";

type CashdropModalProps = {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (userId: number, amount: number, accessToken: string) => void;
    users: { id: string; name: string }[];
};

function CashdropModal({ isOpen, onClose, handleSubmit, users }: CashdropModalProps) {
    const [userId, setUserId] = useState<string | null>(null);
    const [amount, setAmount] = useState<string>('');
    const accessToken = Cookies.get('refreshToken');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || amount === '' || Number(amount) <= 0) {
            toast.error("يرجى إدخال جميع الحقول بشكل صحيح!");
            return;
        }

        handleSubmit(Number(userId), Number(amount), accessToken || '');

        toast.success(" عملية التوريد تمت بنجاح");
        setUserId(null);
        setAmount('');
        onClose();
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <CustomModal
                modalOpen={isOpen}
                setModalOpen={onClose}
                title="Add Cash Drop"
                content={
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
                        <form onSubmit={handleFormSubmit} className="space-y-3">
                            <div className="space-y-2">
                                <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
                                    Select User
                                </label>
                                <select
                                    id="user-select"
                                    value={userId || ''}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select User</option>
                                    {users?.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (Number(value) >= 0 || value === '') {
                                            setAmount(value);
                                        }
                                    }}
                                    required
                                    placeholder="Enter amount"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                }
            />
        </>

    );
}

export default CashdropModal;
