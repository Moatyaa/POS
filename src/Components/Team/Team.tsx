import React, {useState} from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"

import Image from "next/image";
import edit from "../../../public/Icons/edit.svg";
import {Content} from "@/Types/categoriesTypes";
import EditModal, {Field} from "@/Components/Settings/EditModal";
import plus from "../../../public/Icons/icon-plus.svg";
import {useSettings} from "@/Context/SettingsContext";
import {Toaster} from "react-hot-toast";
import {Branch} from "@/Types/modalType";
import {useTranslations} from "use-intl";
import Cookies from "js-cookie";

export interface User extends Content{
    id: number;
    name: string;
    email: string;
    role: string;
}
function Team() {
    const t= useTranslations('SettingsModal')
    const {branches} = useSettings()
    const [modalState, setModalState] = useState({
        open: false,
        mode: '' as 'add' | 'edit',
        currentId: null as number | null,
        currentName: '',
        currentItem: {} as Content,
        resource: "AppUser",
        type: '',

    });
    const locals = Cookies.get('MYNEXTAPP_LOCALE')

    // Function to handle Edit modal
    const handleEdit = (item: User) => {
        setModalState({
            open: true,
            mode: 'edit',
            currentId: item.id,
            currentName: item.name,
            currentItem: item,
            resource: "AppUser",
            type: '',
        });
    };

    const handleAdd = (branch:Branch) => {
        setModalState({
            open: true,
            mode: 'add',
            currentId: branch.id,
            currentName: '',
            currentItem: {} as Content,
            resource: "AppUser",
            type: '',

        });
    };
    const fields : Field[] = [
        {
            label: 'User Name',
            key: 'name',
            type: 'text',
            message: 'Please input the User name.',
        },{
            label: 'Email',
            key: 'email',
            type: 'email',
            message: 'Please input the User Email.',
        },{
            label: 'Password',
            key: 'passwordJson',
            type: 'password',
            message: 'Please input the password.',
        },{
            label: 'Role',
            key: 'roles',
            type: 'select',
            message: 'Please input the User Role',
        }
    ]

    return (
        <section id="teamsBody" className="p-[20px]  rounded-lg ">
            <Toaster position="top-center" reverseOrder={false} />
            <Accordion type="single" collapsible className="space-y-4">
                {branches?.map((branch) => (
                    <AccordionItem
                        key={branch.id}
                        value={`${branch.id}`}
                        className="bg-white rounded-lg shadow-md transition duration-300 hover:shadow-lg"
                    >
                        <AccordionTrigger
                            className="text-lg font-semibold text-gray-800 p-4 hover:text-white hover:bg-blue-500 transition duration-300 rounded-md cursor-pointer">
                            {branch.name}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 p-4 bg-gray-50 rounded-b-lg">
                        {/* User Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse" dir={locals=='ar' ? "rtl" : "ltr"}>
                                    <thead>
                                    <tr className='text-justify'>
                                        <th className="py-3 px-4   font-semibold text-gray-700">{t("Name")}</th>
                                        <th className="py-3 px-4  font-semibold text-gray-700">{t("Email")}</th>
                                        <th className="py-3 px-4  font-semibold text-gray-700">{t("Role")}</th>
                                        <th className="py-3 px-4 font-semibold text-gray-700 text-center" >{t("Actions")}</th>
                                        <th className="py-3 px-4  font-semibold text-gray-700 cursor-pointer">
                                            <span className="plusIcon" onClick={()=>handleAdd(branch)}>
                                                <Image src={plus} width={15} height={15} alt="Add"/>
                                            </span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {branch.appUsers.length > 0? branch.appUsers.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-gray-100">
                                            <td className="py-3 px-4 text-gray-700">{user.name}</td>
                                            <td className="py-3 px-4 text-gray-700">{user.email}</td>
                                            <td className="py-3 px-4 text-gray-600"> {user.roles.map((role) => (
                                                <p key={role.id}>
                                                    {role.name}
                                                </p>
                                            ))}</td>
                                            <td className="py-3">
                                                <div className="operationIcons justify-center  flex gap-2">
                                                    <span className="plusIcon set_edit_icon !bg-white group cursor-pointer"
                                                         onClick={() => handleEdit(user)}>
                                                        <Image src={edit} width={15} height={15} className="group-hover:scale-125"
                                                            alt="Edit Icon"/>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                    )): <span className="w-100 font-xl text-gray-500">Branch have no Users</span>}
                                    </tbody>
                                </table>
                                <EditModal
                                    modalState={modalState}
                                    setModalState={setModalState}
                                    activeSubLinkTitle={t('User')}
                                    fields={fields}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}

export default Team;
