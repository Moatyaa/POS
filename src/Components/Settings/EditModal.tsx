import React, { useEffect, useState } from 'react';
import { Input, Form, Select } from 'antd';
import CustomModal from '@/Components/CustomModal/CustomModal';
import { useSettings } from '@/Context/SettingsContext';
import { Content } from '@/Types/categoriesTypes';
import { useTranslations } from "use-intl";
import Cookies from "js-cookie";

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
    type?: 'text' | 'number' | 'select' | 'email' | 'password' | 'checkbox';
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
    const t = useTranslations('SettingsModal');
    const locale = Cookies.get('MYNEXTAPP_LOCALE');

    useEffect(() => {
        if (modalState.resource !== "Product") return;

        setItem((prevItem) => {
            const updatedItem = { ...modalState.currentItem };
            let hasChanges = false;

            fields.forEach((field) => {
                if (field.type === "checkbox" && updatedItem[field.key] === undefined) {
                    updatedItem[field.key] = false;
                    hasChanges = true;
                }
            });

            return hasChanges ? updatedItem : prevItem;
        });
    }, [modalState.currentItem, modalState.resource, fields]);

    useEffect(() => {
        setItem(modalState.currentItem);
        if (modalState.resource === "AppUser") {
            setItem((prev) => ({ ...prev, branch_id: modalState.currentId }));
        }
    }, [modalState.currentItem, modalState.resource, modalState.currentId]);

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

    const closeModal = () => {
        setModalState((prevState) => ({ ...prevState, open: false }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        key: string
    ) => {
        const { type, value, checked } = e.target as HTMLInputElement;
        setItem((prevItem) => ({
            ...prevItem,
            [key]: type === "checkbox" ? checked : value,
        }));
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
        modifyData(item, modalState.resource);
        closeModal();
    };

    const renderFields = () => {
        return fields.map((field: Field) => {
            if (field.type === 'select' && field.key) {
                return (
                    <Form.Item key={field.key} label={t(field.label)} rules={[{ required: true }]}>
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

            if (field.type === 'checkbox') {
                return (
                    <Form.Item key={field.key} label={t(field.label)}>
                        <Input
                            type="checkbox"
                            checked={item[field.key] ?? false}
                            onChange={(e) => handleChange(e, field.key)}
                        />
                    </Form.Item>
                );
            }

            return (
                <Form.Item
                    key={field.key}
                    label={t(field.label)}
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
            title={`${modalState.mode === 'edit' ? 'Edit' : t('Add')} ${activeSubLinkTitle}`}
            content={
                <div>
                    <Form>
                        <div className={locale ? locale === "ar" ? "arForm" : "enForm" : 'enForm'}>
                            {renderFields()}
                        </div>
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
