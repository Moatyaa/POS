import React, {useEffect, useState} from 'react';
import { useCart } from "@/Context/CartContext";
import CustomModal from "@/Components/CustomModal/CustomModal";
import {CartModalProps} from "@/Types/types";
import PaymentSuccessAnimation from "@/Components/ui/successAnimation";
import PrintableReceipt from "@/Components/ui/PrintableReceipt";

const CartConfirmationModal: React.FC<CartModalProps> = ({ isOpen, onCancel }) => {
    const { cartProducts,setCartProducts } = useCart();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const totalPrice = cartProducts.reduce((sum, item) => Math.ceil(sum + item.price * item.quantity), 0);

    const handlePayment = async () => {
        setLoading(true);
        setPaymentSuccess(false)
        setTimeout(() => {
            setLoading(false);
            setPaymentSuccess(true);
        }, 10000);
    };

    return (
        <CustomModal
            modalOpen={isOpen}
            setModalOpen={onCancel}
            title={!paymentSuccess ? `Total Price: ${totalPrice} EGP` : ''}
            content={
            cartProducts.length > 0 ?
                !paymentSuccess ?  <>
                <div className={`order_conf_modal ${loading ? 'animate-pulse' : ''}`}>
                    <div className={`conf_modal_items`}>
                        {cartProducts.map((item, index) => (
                            <div key={index}
                                 className="conf_modal_item">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={item.image.src}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                        <p className="text-sm text-gray-500">Price: {item.price} EGP</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        <p className="text-sm text-gray-900">Total: {Math.ceil(item.price * item.quantity)} EGP</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={handlePayment}
                            className="py-2 px-3 w-[100%] block bg-green-500 text-[12px] text-white font-semibold rounded-lg hover:bg-green-600"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </div>
            </> : <div className='center'>
                <PaymentSuccessAnimation/>
                <PrintableReceipt content={
                    <>
                        <div>
                            <h2 style={{ textAlign: 'center', fontSize: '16px', marginBottom: '20px' }}>
                                إيصال الدفع
                            </h2>

                            <div style={{ marginBottom: '10px' }}>
                                <strong>اسم العميل:</strong> أحمد محمد
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <strong>التاريخ:</strong> 07/01/2025
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <strong>رقم الفاتورة:</strong> 123456789
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h3>تفاصيل المنتجات:</h3>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                    <tr>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>المنتج</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>الكمية</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>السعر</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>الإجمالي</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>منتج 1</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>2</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>50 EGP</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>100 EGP</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>منتج 2</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>75 EGP</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>75 EGP</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                <strong>الإجمالي:</strong> 175 EGP
                            </div>

                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                <h4>شكرًا لشرائك!</h4>
                            </div>
                        </div>

                    </>
                } pageSize={{ width: '80mm', height: 'auto' }}/>

            </div> : 'Cart is Empty'}
        />
    );
};

export default CartConfirmationModal;
