import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from 'antd';
import ModalSlider from './modalSlider';
import CustomModal from '@/Components/CustomModal/CustomModal';
import { categoriesImages, productImages } from '@/Constants/data';
import { useSettings } from '@/Context/SettingsContext';
import { Content } from '@/Types/categoriesTypes';

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
    key: string;
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
        if (modalState.resource === 'Product' && categories?.length > 0) {
            setOptions(categories.map((category) => ({ id: category.id, name: category.name })));
        } else if (
            (modalState.resource === 'Branch' || modalState.resource === 'Customer') &&
            cooperation?.length > 0
        ) {
            setOptions(cooperation.map((cooperation) => ({ id: cooperation.id, name: cooperation.name })));
        } else if (modalState.resource === 'Terminal' && branches?.length > 0) {
            setOptions(branches.map((branch) => ({ id: branch.id, name: branch.name })));
        } else if (modalState.resource === 'AppUser' && roles?.length > 0) {
            setOptions(roles.map((role) => ({ id: role.id, name: role.name })));
        }
    }, [categories, modalState.resource, cooperation, branches, roles]);


    useEffect(() => {
        setItem(modalState.currentItem);
    }, [modalState.currentItem]);

    useEffect(() => {
        setItem(modalState.currentItem);
        if (modalState.resource === "AppUser") {
            setItem((prev) => ({ ...prev, branch_id: modalState.currentId }));
        }
    }, [modalState])

    const closeModal = () => {
        setModalState((prevState) => ({ ...prevState, open: false }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        key: string
    ) => {
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

    const handleSelectChange = (value: any, key: string) => {
        setItem((prevItem) => ({
            ...prevItem,
            [key]: value,
        }));
    };

    const add = async () => {
        addData(item, modalState.resource);
        closeModal();
    };

    const edit = async () => {
        modifyData(modalState.currentItem, modalState.resource);
        closeModal();
    };

    const renderFields = () => {
        return fields.map((field: Field) => {
            if (field.type === 'select' && field.key) {
                return (
                    <Form.Item key={field.key} label={field.label} rules={[{ required: true }]}>
                        <Select
                            mode={modalState.resource === 'AppUser' ? 'multiple' : undefined}
                            value={
                                modalState.resource === 'AppUser'
                                    ? item[field.key]?.map((obj: any) => obj.id) || []
                                    : item[field.key] ?? undefined
                            }
                            onChange={(selectedIds) => {
                                const value =
                                    modalState.resource === 'AppUser'
                                        ? selectedIds.map((id: number) => ({ id }))
                                        : selectedIds;
                                handleSelectChange(value, field.key);
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
                <Form.Item
                    key={field.key}
                    label={field.label}
                    rules={[{ required: true, message: field.message }]}
                >
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
                        <ModalSlider
                            images={modalState.type === 'products' ? productImages : categoriesImages}
                        />
                    )}
                    <Form>
                        {renderFields()}
                        <button
                            type="button"
                            className="modalBtn ant-btn"
                            onClick={() => (modalState.mode === 'edit' ? edit() : add())}
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
