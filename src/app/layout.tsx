import type { Metadata } from "next";
import { Urbanist, Tajawal } from "next/font/google";
import "../Styles/globals.css";
import React from "react";
import UserContextProvider from "@/Context/UserContext";
import SettingContextProvider from "@/Context/SettingsContext";

const tajawal = Tajawal({
    weight: ["200", "300", "400", "500", "700", "800", "900"],
    variable: "--font-tajwal",
    subsets: ["arabic"]
});

const urbanist = Urbanist({
    weight: ["200", "300", "400", "500", "700", "800", "900"],
    variable: "--font-urbanist",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "POS - Point of Sale System",
    description: "A powerful and user-friendly point of sale (POS) system designed for businesses to manage transactions, track sales, and streamline inventory management. Ideal for retailers, restaurants, and small businesses looking to enhance efficiency and customerSet service.",
    keywords: [
        'Point of sale',
        'Products',
        'Reports',
        'Sales system',
        'inventory management',
        'POS software',
        'Retail POS',
        'Business solutions',
        'E-commerce',
        'Transaction management',
        'Retail management',
        'Restaurant POS',
        'Small business POS'
    ]
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${tajawal.variable} ${urbanist.variable}`}>
        <div className='pos_container'>
            <UserContextProvider>
                <SettingContextProvider>
                    {children}
                </SettingContextProvider>;
            </UserContextProvider>
        </div>
        </body>
        </html>
    );
}
