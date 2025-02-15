import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
    const cookieLocale = (await cookies()).get("MYNEXTAPP_LOCALE")?.value || "ar";

    const locale = cookieLocale.trim() || "ar"; // Ensure no empty or invalid locale

    try {
        const messages = (await import(`../messages/${locale}.json`)).default;

        return {
            locale,
            messages,
        };
    } catch (error) {
        console.error(`Error loading messages for locale: ${locale}`, error);
        return {
            locale: "ar",
            messages: (await import(`../messages/ar.json`)).default,
        };
    }
});
