// hooks/useActiveSubLink.ts
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { sideBarLinks } from "@/Constants/data";
import { SidebarLinks } from "@/Types/types";

export default function useActiveSubLink() {
    const path = usePathname();

    const matchedLink = useMemo(() => {
        return sideBarLinks.find((link: SidebarLinks) => link.route === '/settings');
    }, []);

    const currentSubLinks = useMemo(() => {
        return matchedLink?.dropDownItems || [];
    }, [matchedLink]);

    const activeSubLinkTitle = useMemo(() => {
        const activeSubLink = currentSubLinks.find(subLink => path.includes(subLink.route));
        return activeSubLink?.option;
    }, [path, currentSubLinks]);

    return { currentSubLinks, activeSubLinkTitle };
}
