import React, {  useRef } from 'react';
import  { useReactToPrint } from 'react-to-print';

interface PrintableReceiptProps {
    content: React.ReactNode; // محتوى الطباعة
    pageSize: { width: string; height: string }; // أبعاد الورقة
}

const PrintableReceipt: React.FC<PrintableReceiptProps> = ({ content, pageSize }) => {
    const contentRef = useRef<HTMLDivElement>(null);


    const reactToPrintFn = useReactToPrint({
        contentRef,
    });

    return (
        <div className='flex flex-col'>
            <div
                ref={contentRef}
                className="react-to-print"
                style={{
                    ...pageSize,
                    padding: '10px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    direction: 'rtl', // لتحديد اتجاه النص من اليمين لليسار
                    textAlign: 'right', // محاذاة النص لليمين
                }}
            >
                {content}
            </div>
            <div className=' mt-3'>
                <button
                    onClick={() => reactToPrintFn()}
                    className="py-2 w-[100%] px-4 bg-blue-500 text-white rounded-lg"
                >
                    Print Receipt
                </button>
            </div>
            <style>
                {`
                    /* إعدادات الطباعة */
                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                        }

                        /* تحديد حجم الورقة للإيصال */
                        .react-to-print {
                            size: 80mm 200mm; /* تحديد أبعاد الإيصال */
                            margin: 0;
                            padding: 0;
                        }

                        /* إعدادات الاتجاه إذا كنت تحتاج إلى landscape */
                        @page {
                            size: 80mm 200mm;  /* يمكنك تعديل الأبعاد هنا */
                            margin: 0;
                        }

                        body * {
                            visibility: hidden; /* إخفاء العناصر الأخرى في الصفحة */
                        }

                        .react-to-print, .react-to-print * {
                            visibility: visible;
                        }

                        .react-to-print {
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PrintableReceipt;
