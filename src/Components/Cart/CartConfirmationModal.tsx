import React, {useState} from 'react';
import {useCart} from "@/Context/CartContext";
import CustomModal from "@/Components/CustomModal/CustomModal";
import {CartModalProps} from "@/Types/types";
import PaymentSuccessAnimation from "@/Components/ui/successAnimation";
import PrintableReceipt from "@/Components/ui/PrintableReceipt";
import Image from 'next/image';
import {formatDateTime, httpInterceptor} from "@/lib/utils";
import Cookies from "js-cookie";
import logo from "../../../public/Images/copy.gif";
import {Product} from "@/Types/productsTypes";
import {useSettings} from "@/Context/SettingsContext";
import ImageWithFallback from "@/Components/ui/ImageWithFallback";
import {useTranslations} from "use-intl";

type transaction = {
    employee_name: string,
    branch_name :string,
    orderDate:Date ,
    transactionItems: {
        price: number,
        quantity: number,
        product_id: number,
        product: Product,
    }[];
    id: string
}
const CartConfirmationModal: React.FC<CartModalProps> = ({isOpen, onCancel}) => {
    const { fetchCurrentShift  } = useSettings();
    const { fetchStockProducts , setStockProducts , fetchDataById} = useSettings();
    const {cartProducts, setCartProducts} = useCart();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [transaction, setTransactions] = useState<transaction>();
    const userDataString = sessionStorage?.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Transaction`;
    const refreshToken = Cookies.get("refreshToken");
    const t = useTranslations('Cart')
    const totalPrice = cartProducts.reduce((sum, item) => Math.ceil(sum + item.product.salePrice * item.quantity), 0);
    const handlePayment = async () => {
        setLoading(true);
        setPaymentSuccess(false);
        const formattedCart = formatCartProducts(cartProducts);

        try {
            const response = await httpInterceptor('POST', { transactionItems: formattedCart }, {}, `${API_URL}`, refreshToken || '');

            setTransactions(response);
            await fetchCurrentShift();
            setPaymentSuccess(true);
        } catch (err: any) {
            console.error('Failed to fetch transaction', err);
        } finally {
            try {
                const activeCategoryId = sessionStorage.getItem('ActiveCategoryId');
                let AfterOrder: any = null;

                if (activeCategoryId) {
                    const response: Product = await fetchDataById(`ProductStock/GetByCategoryId/${activeCategoryId}`);
                    setStockProducts(response.content);                }
                else {
                    AfterOrder = await fetchStockProducts();

                }

                if (Array.isArray(AfterOrder) && AfterOrder.length > 0) {
                    setStockProducts(AfterOrder);
                    console.log('Stock Products Updated:', AfterOrder);
                } else {
                    console.warn('Fetched stock products are empty or invalid');
                }
            } catch (error) {
                console.error('Failed to fetch stock products', error);
            } finally {
                setLoading(false);
            }
        }
    };





    const formatCartProducts = (cartProducts: any[]) => {
        return cartProducts.map(item => ({
            price: item.product.salePrice,
            quantity: item.quantity,
            product_id: item.product.id,
        }));
    };


    const handleCancel = async ()=>{
        onCancel(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        paymentSuccess ? setCartProducts([]) : ''
        setPaymentSuccess(false)
        const activeCategoryId = sessionStorage.getItem('ActiveCategoryId');

        if (activeCategoryId) {
            const response: Product = await fetchDataById(`ProductStock/GetByCategoryId/${activeCategoryId}`);
            setStockProducts(response.content);
        } else {
             fetchStockProducts();
        }
    }

    return (
        <CustomModal
            modalOpen={isOpen}
            setModalOpen={handleCancel}
            title={!paymentSuccess ? `${t("Total Price")}: ${totalPrice} ${t('EGP')}` : ''}
            content={
                cartProducts ? (
                    cartProducts.length > 0 ? (
                        !paymentSuccess ? (
                            <div className={`order_conf_modal ${loading ? 'animate-pulse' : ''}`}>
                                <div className={`conf_modal_items`}>
                                    {cartProducts.map((item, index) => (
                                        <div key={index} className="conf_modal_item">
                                            <div className="flex items-center space-x-4">
                                                <ImageWithFallback id={item.product_id} resource={`Product`} width={60} height={60} />
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-800">{item.product.name}</h4>
                                                    <p className="text-sm text-gray-500">{t("Price")}: {item.product.salePrice} EGP</p>
                                                    <p className="text-sm text-gray-500">{t("Quantity")}: {item.quantity}</p>
                                                    <p className="text-sm text-gray-900">
                                                        {t("total")}: {Math.ceil(item.product.salePrice * item.quantity)} EGP
                                                    </p>
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
                                        {t("Confirm Payment")}
                                    </button>

                                </div>
                            </div>
                        ) : (
                            <div className="center">
                                <PaymentSuccessAnimation/>
                                {paymentSuccess && transaction ? (
                                    <PrintableReceipt
                                        onCancel={onCancel}
                                        content={
                                            <>
                                                <div style={{fontFamily: "'Tajawal', sans-serif"}}>
                                                    <Image
                                                        src={logo}
                                                        alt="Logo"
                                                        className="max-w-[100%] mb-[10px]"
                                                    />
                                                    <p className='text-center my-2 text-lg'>
                                                        <strong>رقم الطلب:</strong> {transaction.id}
                                                    </p>
                                                    <div className="flex justify-between my-3">
                                                        <div>
                                                            <h3><strong>اسم الفندق:</strong> {userData.branch_name}
                                                            </h3>
                                                            <h4><strong>اسم الفرع:</strong> {userData.shift.terminal.name}</h4>
                                                            <h4><strong>اسم الكاشير:</strong> {userData.employee_name}</h4>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                <strong>التاريخ:</strong> {formatDateTime(transaction.orderDate).dateOnly}
                                                            </p>
                                                            <p>
                                                                <strong>الوقت:</strong> {formatDateTime(transaction.orderDate).timeOnly}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <h3 className="text-center mb-[10px]">تفاصيل المنتجات</h3>
                                                        <table style={{
                                                            width: '100%',
                                                            borderCollapse: 'collapse',
                                                            direction: 'rtl'
                                                        }}>
                                                            <thead>
                                                            <tr>
                                                                <th style={{
                                                                    border: '1px solid #ddd',
                                                                    padding: '8px'
                                                                }}>المنتج
                                                                </th>
                                                                <th style={{
                                                                    border: '1px solid #ddd',
                                                                    padding: '8px'
                                                                }}>سعر
                                                                    الوحدة
                                                                </th>
                                                                <th style={{
                                                                    border: '1px solid #ddd',
                                                                    padding: '8px'
                                                                }}>الكمية
                                                                </th>
                                                                <th style={{
                                                                    border: '1px solid #ddd',
                                                                    padding: '8px'
                                                                }}>الإجمالي
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {transaction?.transactionItems.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td style={{
                                                                        border: '1px solid #ddd',
                                                                        padding: '8px',
                                                                        textAlign: 'center'
                                                                    }}>
                                                                        {item.product.name}
                                                                    </td>
                                                                    <td style={{
                                                                        border: '1px solid #ddd',
                                                                        padding: '8px',
                                                                        textAlign: 'center'
                                                                    }}>
                                                                        {item.product.salePrice} EGP
                                                                    </td>
                                                                    <td style={{
                                                                        border: '1px solid #ddd',
                                                                        padding: '8px',
                                                                        textAlign: 'center'
                                                                    }}>
                                                                        {item.quantity}
                                                                    </td>
                                                                    <td style={{
                                                                        border: '1px solid #ddd',
                                                                        padding: '8px',
                                                                        textAlign: 'center'
                                                                    }}>
                                                                        {Math.ceil(item.product.salePrice * item.quantity)} EGP
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div style={{
                                                        textAlign: 'right',
                                                        fontSize: '12px',
                                                    }}>
                                                        <strong>ضريبة مضافة:</strong> 0 EGP
                                                    </div>
                                                    <div style={{
                                                        textAlign: 'right',
                                                        fontSize: '12px',
                                                    }}>
                                                        <strong>خدمة مضافة:</strong> 0 EGP
                                                    </div>
                                                    <div style={{
                                                        textAlign: 'right',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        <strong>الإجمالي:</strong> {totalPrice} EGP
                                                    </div>
                                                    <div className='text-center mt-2'>
                                                        <h4>شكرًا لشرائك!</h4>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        pageSize={{width: '80mm', height: 'auto'}}
                                    />
                                ):'No Data'}
                            </div>
                        )
                    ) : (
                        'Cart is Empty'
                    )
                ) : ''}
        />
    );
};

export default CartConfirmationModal;
