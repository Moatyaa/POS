import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { sideBarLinks } from "@/Constants/data";
import clsx from 'clsx';

// eslint-disable-next-line react/display-name
const SidebarLinks = React.memo(() => {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdownToggle = (route: string) => {
        setOpenDropdown((prev) => (prev === route ? null : route));
    };

    return (
        <div className="sidebar__links">
            <nav role="navigation" aria-label="Main Sidebar">
                {sideBarLinks.map((link, index) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    const hasSubLinks = link.dropDownItems? link.dropDownItems.length > 0 : '';
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
                                        {link.dropDownItems?.map((item, idx) => (
                                            <li key={idx}>
                                                <Link href={`/settings/${item.route}`} className="dropdownItem">
                                                    {item.option}
                                                </Link>
                                            </li>
                                        ))}
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
