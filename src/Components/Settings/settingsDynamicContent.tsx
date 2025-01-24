import React, { useState } from 'react';
import Image from "next/image";
import plus from "../../../public/Icons/icon-plus.svg";
import edit from "../../../public/Icons/edit.svg";
import deletee from "../../../public/Icons/delete.svg";
import fixedImage from "../../../public/Icons/allMenu.svg";
import EditModal from "@/Components/Settings/EditModal";
import { useSettings } from "@/Context/SettingsContext";
import { Content } from "@/Types/categoriesTypes";
import { Toaster } from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { TabResource } from "@/app/settings/[resource]/page";

interface DynamicContentProps {
    activeTab: TabResource;
    fields: any[];
    resource: string;
    data?: Content[];
}

const DynamicContent: React.FC<DynamicContentProps> = ({ activeTab, fields, resource }) => {
    const { data: contextData, removeData, last, isLoading, setsize, fetchData } = useSettings();
    const refreshToken = sessionStorage.getItem("refreshToken");

    const [modalState, setModalState] = useState({
        open: false,
        mode: '' as 'add' | 'edit',
        currentId: null as number | null,
        currentName: '',
        currentItem: {} as Content,
        type: activeTab.name.toLowerCase(),
        resource: resource,

    });

    // Function to handle Edit modal
    const handleEdit = (item: Content) => {
        setModalState({
            open: true,
            mode: 'edit',
            currentId: item.id,
            currentName: item.name,
            currentItem: item,
            type: activeTab.name.toLowerCase(),
            resource: resource,
        });
    };

    // Function to handle Delete
    const handleDelete = (id: number) => {
        removeData(id, resource);
    };

    // Function to open Add modal
    const handleAdd = () => {
        setModalState({
            open: true,
            mode: 'add',
            currentId: null,
            currentName: '',
            currentItem: {} as Content,
            type: activeTab.name.toLowerCase(),
            resource: resource,
        });
    };

    // Fetch more data on scroll
    const fetchMoreData = async () => {
        if (!last && refreshToken) {
            setsize(prev => prev + 5);
            await fetchData(activeTab);  // Fetch new data for the next page
        }
    };


    // Function to render content based on the active tab
    const renderContent = (item: Content) => {
        switch (activeTab.name) {
            case 'Categories':
                return (
                    <div className="flex items-center gap-4">
                        <div className="iconHolder">
                            <Image src={fixedImage} alt={item.name} className="catIcon" width={30} height={30} />
                        </div>
                        <div className="catInfo !m-0">
                            <h3 className="catTitle">{item.name}</h3>
                        </div>
                    </div>
                );
            case 'Products':
                return (
                    <div className="flex gap-4">
                        <div className="iconHolder">
                            <Image src={fixedImage} alt={item.name} className="catIcon" width={30} height={30} />
                        </div>
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <span>Price: <span className='text-[#696969]'> {item.salePrice}</span></span>
                            <p>SKU: <span className='text-[#696969]'> {item.sku}</span></p>
                            <p>Category: <span className='text-[#696969]'> {item.category?.name}</span></p>
                        </div>
                    </div>
                );
            case 'Branches':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <span>Phone: <span className='text-[#696969]'> {item.phone}</span></span>
                            <p>Address: <span className='text-[#696969]'> {item.address}</span></p>
                            <p>Cooperation: <span className="text-[#696969]">{item.cooperation?.name}</span></p>
                        </div>
                    </div>
                );
            case 'Cooperations':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                        </div>
                    </div>
                );
            case 'Suppliers':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <span>Contact: <span className='text-[#696969]'> {item.contact}</span></span>
                            <p>Address: <span className='text-[#696969]'> {item.address}</span></p>
                        </div>
                    </div>
                );
            case 'Customers':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <p>Phone: <span className="text-[#696969]">{item.phone}</span></p>
                            <p>Email: <span className="text-[#696969]">{item.email}</span></p>
                            <p>Cooperation: <span className="text-[#696969]">{item.cooperation?.name}</span></p>
                        </div>
                    </div>
                );
            case 'Terminals':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <p>Terminal Identifier: <span className="text-[#696969]">{item.identifier}</span></p>
                            <p>Branch: <span className="text-[#696969]">{item.branch?.name}</span></p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="operationHeader" onClick={handleAdd}>
                <h4>Add {activeTab.name}</h4>
                <div className="plusIcon">
                    <Image src={plus} width={15} height={15} alt="Add" />
                </div>
            </div>
            <div className="operationBody">
                <InfiniteScroll
                    dataLength={contextData.length}  // Number of items loaded so far
                    next={fetchMoreData}  // Fetch next data when scrolled to the bottom
                    hasMore={!last}  // If there is more data to load
                    loader={<p className='center'>{isLoading ? (
                        <svg
                            className="animate-spin h-8 w-8 text-[#2d71f8] text-2xl"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 12a8 8 0 0116 0"
                            />
                        </svg>
                    ) : (
                        ''
                    )}</p>}
                    endMessage={<div className="no-more-data"><p>✨ You’ve reached the end! ✨</p></div>}
                    >
                {contextData?.map((item) => (
                        <div className="singleItem" key={item.id}>
                            {renderContent(item)}
                            <div className="operationIcons flex gap-2">
                                <span className="plusIcon set_edit_icon group cursor-pointer" onClick={() => handleEdit(item)}>
                                    <Image src={edit} width={15} height={15} className="group-hover:scale-125" alt="Edit Icon" />
                                </span>
                                <span className="iconBg set_Del_icon group cursor-pointer" onClick={() => handleDelete(item.id)}>
                                    <Image src={deletee} alt="Delete Icon" className="group-hover:scale-125" />
                                </span>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
            <EditModal
                modalState={modalState}
                setModalState={setModalState}
                activeSubLinkTitle={activeTab.name}
                fields={fields}
            />
        </div>
    );
};

export default DynamicContent;
