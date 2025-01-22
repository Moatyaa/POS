import React, { useEffect, useState} from 'react';
import { Input, Form, Select } from 'antd';
import ModalSlider from './modalSlider';
import CustomModal from '@/Components/CustomModal/CustomModal';
import { categoriesImages, productImages } from "@/Constants/data";
import { useSettings } from "@/Context/SettingsContext";
import { Content } from "@/Types/categoriesTypes";


type ModalState = {
    open: boolean;
    mode: 'edit' | 'add';
    currentName: string;
    currentId: number | null;
    currentItem: Content;
    type: string | 'category' | 'product' | 'branches' | 'role' | 'supplier' | 'customer';
    resource: string;

};

export interface Field {
    label?: string;
    key: string ;
    type?: 'text' | 'number' | 'select' | 'email' | 'password';
    options?: { id: number; name: string }[];
    message?: string;
}

interface EditModalProps {
    modalState: ModalState;
    setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
    activeSubLinkTitle: string;
    fields: Field[];
}

const AddModal: React.FC<EditModalProps> = ({
                                                modalState,
                                                setModalState,
                                                activeSubLinkTitle,
                                                fields,
                                            }) => {
    const [item, setItem] = useState<Content>(modalState.currentItem);
    const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
    const { addData, modifyData, categories, cooperation, branches, roles } = useSettings();

    useEffect(() => {
        if (modalState.resource === 'Product') {
            if (categories && categories.length > 0) {
                setOptions(categories.map((category) => ({
                    id: category.id,
                    name: category.name,
                })));
            }
        }
        if (modalState.resource === 'Branch' || modalState.resource === "Customer") {
            if (cooperation && cooperation.length > 0) {
                setOptions(cooperation.map((cooperation) => ({
                    id: cooperation.id,
                    name: cooperation.name,
                })));
            }
        }
        if (modalState.resource === 'Terminal') {
            if (branches && branches.length > 0) {
                setOptions(branches.map((branch) => ({
                    id: branch.id,
                    name: branch.name,
                })));
            }
        }
        if (modalState.resource === 'AppUser') {
            if (roles && roles.length > 0) {
                setOptions(roles.map((role) => ({
                    id: role.id,
                    name: role.name,
                })));
            }

        }
    }, [categories, modalState.resource, cooperation]);

    useEffect(() => {
        setItem(modalState.currentItem);
    }, [modalState.currentItem]);

    useEffect(() => {
        if (modalState.resource == "AppUser") {
            console.log(modalState.currentId)
            setItem((prev) => ({
                ...prev,
                branch_id: modalState?.currentId,
            }));
        }

    }, [modalState]);

    const closeModal = () => {
        setModalState((prevState) => ({ ...prevState, open: false }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: string) => {
        const { value } = e.target;
        if (modalState.mode === 'edit') {
            setModalState((prevState) => ({
                ...prevState,
                currentItem: {
                    ...prevState.currentItem,
                    [key]: value,
                },
            }));
        } else {
            setItem((prevItem) => ({
                ...prevItem,
                [key]: value,
            }));
        }
    };

    const handleSelectChange = (value, key) => {
        if (!item[key]) {
            item[key] = Array.isArray(value) ? [] : {};
        }
        item[key] = value;
        console.log('Updated item:', item);
    };


    const add = async (item: Content) => {
        if(modalState.resource == "AppUser"){
            setItem((prev)=>({
                ...prev ,
                branch_id: modalState.currentId
            }))
        }

         await addData(item, modalState.resource);
         closeModal();

    };

    const edit = async () => {
        await modifyData(modalState.currentItem, modalState.resource);
        closeModal();
    };

    const renderFields = () => {
        return fields?.map((field:Field) => {
            if (field.type === 'select' && field.key !== undefined) {
                return (
                    <Form.Item key={field.key} label={field.label} rules={[{ required: true }]}>
                        <Select
                            mode={modalState.resource === 'AppUser' ? 'multiple' : undefined}
                            value={
                                modalState.resource === 'AppUser'
                                    ? item[field.key]?.map((obj) => obj.id) // إذا كانت متعددة
                                    : item[field.key]
                            }
                            onChange={(selectedIds) => {
                                if (modalState.resource === 'AppUser') {
                                    const selectedObjects = selectedIds.map((id) => ({ id }));
                                    handleSelectChange(selectedObjects, field.key);
                                } else {
                                    handleSelectChange(Number(selectedIds), field.key, options)
                                }
                            }}
                        >
                            {options.length > 0 ? (
                                options.map((option) => (
                                    <Select.Option key={option.id} value={option.id}>
                                        {option.name}
                                    </Select.Option>
                                ))
                            ) : (
                                <Select.Option disabled>No data available</Select.Option>
                            )}
                        </Select>

                    </Form.Item>
                );
            }

            return (
                <Form.Item labelCol={{ span: 6 }}
                           wrapperCol={{ span: 18 }} key={field.key} label={field.label} rules={[{ required: true, message: field.message }]}>
                    <Input
                        type={field.type}
                        value={item[field.key]}
                        onChange={(e) => handleChange(e, field.key)}
                    />
                </Form.Item>
            );
        });
    };
    return (
        <CustomModal
            modalOpen={modalState.open}
            setModalOpen={closeModal}
            title={`${modalState.mode === 'edit' ? 'Edit' : 'Add'} ${activeSubLinkTitle}`}
            content={
                <div>
                    {(modalState.type === 'products' || modalState.type === 'categories') && (
                        <ModalSlider images={modalState.type === 'products' ? productImages : categoriesImages} />
                    )}
                    <Form>
                        {renderFields()}
                        <button
                            type="button"
                            className="modalBtn ant-btn"
                            onClick={() => (modalState.mode === 'edit' ? edit() : add(item))}
                        >
                            <span>{modalState.mode === 'edit' ? 'Edit' : 'Add'}</span>
                        </button>
                    </Form>
                </div>
            }
        />
    );
};

export default AddModal;
