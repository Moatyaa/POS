import React from 'react';
import { Modal } from 'antd';
import {ModalProps} from "@/Types/types";


const CustomModal: React.FC<ModalProps> = ({
                                               modalOpen,
                                               setModalOpen,
                                               title,
                                               content,
                                               footerActions,
                                               onConfirm
                                           }) => {

    // Handle modal close
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Modal
            title={title}
            centered
            open={modalOpen}
            onCancel={handleCloseModal}
            footer={footerActions || null} // Use custom footer actions if provided
            onOk={onConfirm || handleCloseModal} // Use custom confirmation action if provided
        >
            <div className="modal-content">
                {content}
            </div>
        </Modal>
    );
};

export default CustomModal;
