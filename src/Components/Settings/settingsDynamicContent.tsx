import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import plus from '../../../public/Icons/icon-plus.svg';
import edit from '../../../public/Icons/edit.svg';
import deletee from '../../../public/Icons/delete.svg';
import upload from '../../../public/Icons/upload.png';
import EditModal from '@/Components/Settings/EditModal';
import { useSettings } from '@/Context/SettingsContext';
import { Content } from '@/Types/categoriesTypes';
import { Toaster } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageWithFallback from "@/Components/ui/ImageWithFallback";
import {TabResource} from "@/app/settings/[resource]/page";
import {useTranslations} from "use-intl";

interface DynamicContentProps {
    activeTab: TabResource;
    fields: any[];
    resource: string;
    data?: Content[];
}

const DynamicContent: React.FC<DynamicContentProps> = ({ activeTab, fields, resource }) => {
    const {
        data: contextData,
        removeData,
        last,
        fetchData,
        uploadImage,
    } = useSettings();
    const [page, setPage] = useState<number>(0);
    const refreshToken = sessionStorage.getItem('refreshToken');
    const t = useTranslations('resources')
    const handleFileChange = (image: File, item: Content) => {
        uploadImage(item, image, resource);
    };

    const [modalState, setModalState] = useState({
        open: false,
        mode: '' as 'add' | 'edit',
        currentId: null as number | null,
        currentName: '',
        currentItem: {} as Content,
        type: activeTab.name.toLowerCase(),
        resource: resource,
    });

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

    const handleDelete = (id: number) => {
        removeData(id, resource);
    };

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

    const fetchMoreData = async () => {
        console.log(last)
        console.log(refreshToken)
        if (!last && refreshToken) {
            setPage((prev) => prev + 1);
            console.log("Fetching page:", page + 1);
            try {
                await fetchData(activeTab, page + 1);
            } catch (error) {
                console.error('Error fetching more data:', error);
            }
        } else {
            console.log("No more data to load.");
        }
    };

    useEffect(() => {
        setPage(0)
        fetchData(activeTab, 1);
    }, [activeTab.resource]);

    const renderContent = (item: Content) => {
        switch (activeTab.name) {
            case 'Categories':
                return (
                    <div className="flex items-center gap-4">
                        <div className="iconHolder">
                            <ImageWithFallback id={item.id} resource={resource} />
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
                            <ImageWithFallback id={item.id} resource={resource} />
                        </div>
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <span>{t('Price')}: <span className='text-[#696969]'>{item.salePrice}</span></span>
                            <p>{t('SKU')}: <span className='text-[#696969]'> {item.sku}</span></p>
                            <p>{t('Category')}: <span className='text-[#696969]'> {item.category?.name}</span></p>
                        </div>
                    </div>
                );
            case 'Branches':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <span>{t('Phone')}: <span className='text-[#696969]'> {item.phone}</span></span>
                            <p>{t('Address')}: <span className='text-[#696969]'> {item.address}</span></p>
                            <p>{t('Cooperation')}: <span className="text-[#696969]">{item.cooperation?.name}</span></p>
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
                            <span>{t('Contact')}: <span className='text-[#696969]'> {item.contact}</span></span>
                            <p>{t('Address')}: <span className='text-[#696969]'> {item.address}</span></p>
                        </div>
                    </div>
                );
            case 'Customers':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <p>{t('Phone')}: <span className="text-[#696969]">{item.phone}</span></p>
                            <p>{t('Email')}: <span className="text-[#696969]">{item.email}</span></p>
                            <p>{t('Cooperation')}: <span className="text-[#696969]">{item.cooperation?.name}</span></p>
                        </div>
                    </div>
                );
            case 'Terminals':
                return (
                    <div className="flex items-center gap-4">
                        <div className="catInfo !m-0">
                            <h3 className="catTitle !font-bold">{item.name}</h3>
                            <p>{t('Terminal Identifier')}: <span className="text-[#696969]">{item.identifier}</span></p>
                            <p>{t('Branch')}: <span className="text-[#696969]">{item.branch?.name}</span></p>
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
                <h4>{t("Add")} {t(activeTab.name)}</h4>
                <div className="plusIcon">
                    <Image src={plus} width={15} height={15} alt="Add" />
                </div>
            </div>
            <div className="operationBody" id="scrollable-content" style={{ height: '80vh', overflowY: 'scroll' }}>
                <InfiniteScroll
                    dataLength={contextData.length}
                    next={fetchMoreData}
                    hasMore={!last}
                    loader={<div className="loaderContainer py-4 text-center"><p className="text-gray-500">جارٍ تحميل المزيد...</p></div>}
                    endMessage={<div className="no-more-data py-4 text-center"><p className="text-gray-500">✨{t("You Have Reached The End")}!✨</p></div>}
                    scrollableTarget="scrollable-content"
                >
                    {contextData?.map((item) => (
                        <div className="singleItem p-4 border-b border-gray-200" key={item.id}>
                            {renderContent(item)}
                            <div className="operationIcons flex gap-2 mt-2">
                                <span className="plusIcon set_edit_icon group cursor-pointer" onClick={() => handleEdit(item)}>
                                    <Image src={edit} width={15} height={15} className="group-hover:scale-125" alt="Edit Icon" />
                                </span>
                                <span className="iconBg set_Del_icon group cursor-pointer" onClick={() => handleDelete(item.id)}>
                                    <Image src={deletee} alt="Delete Icon" className="group-hover:scale-125" />
                                </span>
                                {activeTab.name === "Products" || activeTab.name === "Categories" ? (
                                    <span className="iconBg set_Del_icon group cursor-pointer">
                                        <label>
                                            <input type="file" onChange={(event) => {
                                                if (event.target.files) {
                                                    handleFileChange(event.target.files[0], item);
                                                }
                                            }} hidden />
                                            <Image src={upload} alt="Upload Icon" className="group-hover:scale-125" />
                                        </label>
                                    </span>
                                ) : ''}
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
            <EditModal
                modalState={modalState}
                setModalState={setModalState}
                activeSubLinkTitle={t(activeTab.name)}
                fields={fields}
            />
        </div>
    );
};

export default DynamicContent;
