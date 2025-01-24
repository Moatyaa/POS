import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { sideBarLinks } from "@/Constants/data";
import clsx from 'clsx';
import Cookies from "js-cookie";

// eslint-disable-next-line react/display-name
const SidebarLinks = React.memo(() => {
    const pathname = usePathname();
    const userRoles = Cookies.get("role")?.split(',') || [];  // Assuming roles are stored as a comma-separated string
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdownToggle = (route: string) => {
        setOpenDropdown((prev) => (prev === route ? null : route));
    };

    return (
        <div className="sidebar__links">
            <nav role="navigation" aria-label="Main Sidebar">
                {sideBarLinks.map((link, index) => {
                    const isRoleAllowed = userRoles.includes(link.role) || userRoles.includes('Admin');
                    if (link.role && !isRoleAllowed) return null;

                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    const hasSubLinks = link.dropDownItems ? link.dropDownItems.length > 0 : false;

                    return (
                        <div key={index} className="sidebar__link-wrapper">
                            <Link
                                href={link.route}
                                className={clsx('sideBarLink', { 'activeLink': isActive, 'hasSubLinks': hasSubLinks })}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={(e) => {
                                    if (hasSubLinks) {
                                        e.preventDefault();
                                        handleDropdownToggle(link.route);
                                    }
                                }}
                            >
                                <span className="linkIconHolder">
                                    <Image src={link.icon} alt={link.title} className="linkIcon" />
                                </span>
                                <p className="linkTitle">{link.title}</p>
                                {hasSubLinks && (
                                    <span className="dropdownArrow">
                                        {openDropdown === link.route ? '▲' : '▼'}
                                    </span>
                                )}
                            </Link>

                            {hasSubLinks && openDropdown === link.route && (
                                <div className="dropdownMenu open">
                                    <ul>
                                        {link.dropDownItems?.map((item, idx) => {
                                            const isSubLinkRoleAllowed = userRoles.includes(item.role) || userRoles.includes('Admin');
                                            if (item.role && !isSubLinkRoleAllowed) return null;

                                            return (
                                                <li key={idx}>
                                                    <Link href={`/settings/${item.route}`} className="dropdownItem">
                                                        {item.option}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
});

export default SidebarLinks;
