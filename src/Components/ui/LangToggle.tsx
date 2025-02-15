import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LanguageToggle = () => {
    const [locale, setLocale] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const cookieLocale = document.cookie
            .split("; ")
            .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
            ?.split("=")[1];

        if (!cookieLocale) {
            const browserLoc = navigator.language.slice(0, 2);
            setLocale(browserLoc);
            document.cookie = `MYNEXTAPP_LOCALE=${browserLoc}; path=/`;
        } else {
            setLocale(cookieLocale);
        }

        document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
        document.body.style.fontFamily = locale === "ar" ? "'Tajawal', sans-serif" : "'Urbanist', sans-serif";
    }, [router, locale]);

    const toggleLanguage = (newLocale: string) => {
        setLocale(newLocale);
        document.cookie = `MYNEXTAPP_LOCALE=${newLocale}; path=/`;
        router.refresh();
    };

    return (
        <div className={`flex fixed bottom-2 ${locale === "en" ? "left-2" : "right-2"} items-center space-x-3`}>
            <div
                onClick={() => toggleLanguage(locale === "ar" ? "en" : "ar")}
                className="relative w-12 h-6 bg-[#2d71f8] rounded-full cursor-pointer transition-all duration-300"
            >
                <div
                    className={`absolute bg-white text-[#333] w-6 h-6 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center text-sm font-semibold transform ${
                        locale === "ar" ? "translate-x-0.5" : "translate-x-0"
                    }`}
                    style={{ zIndex: 1 }}
                >
                    {locale === "ar" ? "ع" : "EN"}
                </div>
            </div>
        </div>
    );
};

export default LanguageToggle;
