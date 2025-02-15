import React, { useEffect, useState, useMemo } from 'react';
import { useProduct } from '@/hooks/useProduct';
import CustomModal from '@/Components/CustomModal/CustomModal';
import { Product } from '@/Types/modalType';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    selectedProduct: Product;
}

interface PurchaseOrderItem {
    product_id: string;
    quantity: number;
    price: string;
    [key: string]: string | number;
}

interface ApiError {
    message: string;
}

function AddProductModal({ isOpen, onClose, selectedProduct }: AddProductModalProps) {
    const { products, suppliers, AddToStock } = useProduct();
    const [showCount, setShowCount] = useState<boolean>(true);
    const [supplier_id, setSupplierId] = useState('');
    const [purchaseOrderItems, setPurchaseOrderItems] = useState<PurchaseOrderItem[]>([{ product_id: '', quantity: 0, price: '' }]);
    const userData = sessionStorage.getItem('userData');

    const productMap = useMemo(() => {
        return new Map(products.map((product) => [product.id, product]));
    }, [products]);

    useEffect(() => {
        if (selectedProduct && selectedProduct.product_id) {
            setPurchaseOrderItems([{ product_id: selectedProduct.product_id, quantity: selectedProduct.stock, price: selectedProduct.product.salePrice }]);
        }
    }, [selectedProduct]);

    const resetForm = () => {
        setSupplierId('');
        setPurchaseOrderItems([{ product_id: '', quantity: 1, price: '' }]);
    };

    const addRow = () => {
        setPurchaseOrderItems([...purchaseOrderItems, { product_id: '', quantity: 1, price: '' }]);
    };

    const handleSave = async () => {
        try {
            if (userData) {
                const branch_id = JSON.parse(userData).branch_id;
                await AddToStock({ branch_id, supplier_id, purchaseOrderItems });
                resetForm();
                onClose(false);
            }
        } catch (err: unknown) {
            const error = err as ApiError;
            console.log(error.message);
        }
    };

    const handleChange = (index: number, field: string, value: string | number) => {
        setPurchaseOrderItems((prevRows) => {
            const updatedRows = [...prevRows];
            if (updatedRows[index][field] === value) return prevRows;
            updatedRows[index][field] = value;
            if (field === 'product_id') {
                const selectedProduct = productMap.get(Number(value));
                console.log(selectedProduct)
                setShowCount(!!selectedProduct?.service);
            }
            return updatedRows;
        });
    };

    const handleDelete = (index: number) => {
        setPurchaseOrderItems(purchaseOrderItems.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    return (
        <CustomModal
            modalOpen={isOpen}
            setModalOpen={onClose}
            title={'Add Product Stock'}
            content={
                <div className="modal">
                    <div className="modal-content">
                        <div className="mb-4">
                            <select
                                value={supplier_id}
                                onChange={(e) => setSupplierId(e.target.value)}
                                className="dropdown w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Supplier</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="max-h-[250px] overflow-y-auto">
                            {purchaseOrderItems.map((row, index) => (
                                <div key={index} className="row flex gap-4 items-center mb-4 p-4 bg-white rounded-lg shadow-lg">
                                    <select
                                        value={row.product_id}
                                        onChange={(e) => handleChange(index, 'product_id', e.target.value)}
                                        className="dropdown w-full sm:w-[50%] p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Product</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                        placeholder="Quantity"
                                        className={`input w-full sm:w-[25%] p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none showCount focus:ring-2 focus:ring-green-500 ${showCount ? 'hideCount' : ''}`}
                                        min="1"
                                    />

                                    <input
                                        type="number"
                                        value={row.price}
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                        placeholder="Price"
                                        className="input w-full sm:w-[25%] p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                                        min="1"
                                    />

                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="delete-btn ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addRow}
                            className="add-row-btn w-full text-white p-1 rounded-md shadow-md bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        >
                            Add Another Product
                        </button>

                        <div className="modal-actions flex gap-4 mt-6">
                            <button
                                onClick={handleSave}
                                className="save-btn w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 transform hover:scale-105"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    resetForm();
                                    onClose(false);
                                }}
                                className="close-btn w-full sm:w-auto bg-gradient-to-r from-gray-500 to-gray-600 text-white p-2 rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 transform hover:scale-105"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            }
        />
    );
}

export default AddProductModal;
