'use client'
import React, { useState, useEffect, useCallback } from 'react';
import SubLinksHeader from "@/Components/SubLinksHeader/SubLinksHeader";
import Image from "next/image";
import plus from "../../../public/Icons/icon-plus.svg";
import filter from "../../../public/Icons/4204434.png"
import { useTranslations } from "use-intl";
import CashdropModal from "@/Components/Financial/CashdropModal";
import { httpInterceptor } from "@/lib/utils";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useSettings } from "@/Context/SettingsContext";
import { getUsers } from "@/Services/branches";

const OPERATORS = {
    sender_id: [
        { value: "EQUALS", label: "البائع فقط" },
        { value: "NOT_EQUALS", label: "الجميع ماعدا" },
    ],
    amount: [
        { value: "EQUALS", label: "يساوي" },
        { value: "NOT_EQUALS", label: "لا يساوي" },
        { value: "GREATER_THAN", label: "أكبر من" },
        { value: "LESS_THAN", label: "أقل من" },
    ],
    createdAt: [
        { value: "EQUALS", label: "يساوي" },
        { value: "NOT_EQUALS", label: "لا يساوي" },
        { value: "BEFORE", label: "قبل" },
        { value: "AFTER", label: "بعد" },
    ],
};

type Filter = Record<string, { value: string; operator: string }>;


function Financial() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cashdrops, setCashdrops] = useState([]);
    const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<Filter>({
        sender_id: { value: "", operator: "EQUALS" },
        amount: { value: "", operator: "EQUALS" },
        createdAt: { value: "", operator: "EQUALS" },
    });
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const accessToken = Cookies.get('refreshToken');
    const { locale } = useSettings();
    const t = useTranslations('SettingsModal');
    const tableT = useTranslations('Financial');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers(accessToken || '');
                setUsers(response?.content || response || []);
            } catch {
                toast.error('Error fetching users');
            }
        };
        fetchUsers();
        getCashDrops()
    }, [accessToken]);

    useEffect(() => {
        if (Object.values(selectedFilters).some(filter => filter.value)) {
            applyFilters();
        }
    }, [selectedFilters]);

    const handleAdd = () => {
        setModalOpen(true);
    };

    const onClose = () => {
        setModalOpen(false);
    };

    const applyFilters = useCallback(async () => {
        const activeFilters = Object.keys(selectedFilters)
            .filter(key => selectedFilters[key].value)
            .map(key => ({
                field: key,
                operator: selectedFilters[key].operator,
                value: selectedFilters[key].value,
            }));

        try {
            const response = await httpInterceptor(
                'POST',
                { filters: activeFilters },
                {},
                `${process.env.NEXT_PUBLIC_API_URL}/CashDrop/FindByPredicate`,
                accessToken || ''
            );
            setCashdrops(response.content);
        } catch {
            toast.error('لا يوجد نتائج لهذا البحث');
        }
    }, [selectedFilters, accessToken]);

    const handleFilterChange = (field: string, value: string) => {
        setSelectedFilters(prev => ({ ...prev, [field]: { ...prev[field], value } }));
    };

    const handleOperatorChange = (field: string, operator: string) => {
        setSelectedFilters(prev => ({ ...prev, [field]: { ...prev[field], operator } }));
    };

    const handelSubmit = async (sender_id: number, amount: number) => {
        try {
            const response = await httpInterceptor(
                'POST',
                { amount, sender_id },
                {},
                `${process.env.NEXT_PUBLIC_API_URL}/CashDrop`,
                accessToken || ''
            );
            console.log(response)
            setCashdrops((prev) => [...prev , response])
        } catch (e) {
            console.error(e);
        }
    }

    const getCashDrops = async () => {
        try {
            const response = await httpInterceptor(
                'GET',
                { filters: activeFilters },
                {},
                `${process.env.NEXT_PUBLIC_API_URL}/CashDrop`,
                accessToken || ''
            );
            setCashdrops(response.content)
        } catch (err) {
            toast.error('Error fetching Cash Drops');
        }
    }

    return (
        <section id='financial' className="relative h-[100vh]">
            <SubLinksHeader activeSubLinkTitle="Financial"/>
            <div className="operationHeader flex justify-between items-center p-4 bg-white shadow-sm rounded-lg mb-4" onClick={handleAdd}>
                <h4 className="text-lg font-semibold">{t("Cash Drop")}</h4>
                <div className="plusIcon p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600">
                    <Image src={plus} width={15} height={15} alt="Add"/>
                </div>
            </div>
            <div className="filters space-y-2 bg-white">
                <div className="mb-6">
                    <div className='bg-white flex justify-between items-center'>
                        <div className='flex gap-4'>
                            <div className="p-1 bg-gray-100 rounded-lg">
                                <select
                                    className="p-1 border rounded-md"
                                    value={selectedFilters.sender_id.value}
                                    onChange={e => handleFilterChange('sender_id', e.target.value)}
                                >
                                    <option value="">{tableT("Select Cashier")}</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                <select
                                    className="p-1 border rounded-md"
                                    onChange={e => handleOperatorChange('sender_id', e.target.value)}
                                >
                                    {OPERATORS.sender_id.map(op => (
                                        <option key={op.value} value={op.value}>{op.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-1 bg-gray-100 rounded-lg">
                                <input
                                    className="p-1 border rounded-md"
                                    type="number"
                                    value={selectedFilters.amount.value}
                                    onChange={e => handleFilterChange('amount', e.target.value)}
                                />
                                <select
                                    className="p-1 border rounded-md"
                                    onChange={e => handleOperatorChange('amount', e.target.value)}
                                >
                                    {OPERATORS.amount.map(op => (
                                        <option key={op.value} value={op.value}>{op.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-1 bg-gray-100 rounded-lg">
                                <input
                                    className="p-1 border rounded-md"
                                    type="date"
                                    value={selectedFilters.createdAt.value}
                                    onChange={e => handleFilterChange('createdAt', e.target.value)}
                                />
                                <select
                                    className="p-1 border rounded-md"
                                    onChange={e => handleOperatorChange('createdAt', e.target.value)}
                                >
                                    {OPERATORS.createdAt.map(op => (
                                        <option key={op.value} value={op.value}>{op.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <span className="plusIcon !bg-white py-2 rounded-full cursor-pointer hover:bg-blue-600">
                                <Image src={filter} width={15} height={15} alt="filter"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="mt-4 overflow-x-auto flex shadow-md sm:rounded-lg">
                    <table className="min-w-full table-auto" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium text-start text-gray-500">{tableT("Cashier")}</th>
                            <th className="px-6 py-3 text-sm font-medium text-start text-gray-500">{tableT("Amount")}</th>
                            <th className="px-6 py-3 text-sm font-medium text-start text-gray-500 flex justify-between items-center">
                                <span>{tableT("Date")}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {cashdrops.length > 0 ? (
                            cashdrops.map((cashdrop: any) => (
                                <tr key={cashdrop.id} className="border-b">
                                    <td className="px-6 py-4 text-sm text-start font-medium text-gray-900">{cashdrop.sender.username}</td>
                                    <td className="px-6 py-4 text-sm text-start text-gray-500">{cashdrop.amount}</td>
                                    <td className="px-6 py-4 text-sm text-start text-gray-500">{new Date(cashdrop.timestamp).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}
                                    className="px-6 py-4 text-sm text-gray-500 text-center">{tableT("No Cash Drops available")}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CashdropModal isOpen={isModalOpen} onClose={onClose} handleSubmit={handelSubmit} users={users} setCashdrops={setCashdrops}/>
        </section>
    );
}

export default Financial;
