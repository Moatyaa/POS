'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DynamicContent from '@/Components/Settings/settingsDynamicContent';
import { resources } from "@/Constants/data";
import SubLinksHeader from "@/Components/SubLinksHeader/SubLinksHeader";
import clsx from "clsx";
import { useSettings } from "@/Context/SettingsContext";
import Cookies from "js-cookie";

export type TabResource = {
    name: string;
    resource: string;
    fields: { label: string; key: string; message: string; type: string }[];
    key: number;
};

const SettingsPage = () => {
    const { resource } = useParams();
    const userRoles = Cookies.get("role")?.split(',') || [];  // Assuming roles are stored as a comma-separated string

    const [activeTab, setActiveTab] = useState<TabResource | undefined>(() => {
        return resources.find((res) => res.resource.toLowerCase() === resource);
    });

    const { data, fetchData } = useSettings();
    const refreshToken = sessionStorage.getItem('refreshToken');

    useEffect(() => {
        if (activeTab && refreshToken) {
            fetchData(activeTab);
        }
    }, [activeTab, refreshToken]);

    useEffect(() => {
        if (resource) {
            const selectedTab = resources.find((res) => res.resource.toLowerCase() === resource);
            if (selectedTab) {
                setActiveTab(selectedTab);
            }
        }
    }, [resource]);

    const handleTabChange = (tab: TabResource) => {
        setActiveTab(tab);
        window.history.replaceState(null, '', `/settings/${tab.resource.toLowerCase()}`);
    };

    return (
        <div>
            <section id="settings" className="settings">
                <div>
                    <SubLinksHeader subHeaderTitle={'Settings'} activeSubLinkTitle={`${activeTab?.name || 'Choose a tab'}`} />
                </div>
                <div className="flex gap-2">
                    <div className="settingLeftSide w-[20%]">
                        {resources.map((res) => {
                            const isSubLinkRoleAllowed = userRoles.includes(res.role) || userRoles.includes('Admin');
                            if (res.role && !isSubLinkRoleAllowed) return null;  // Skip this resource if the user does not have the correct role

                            return (
                                <div
                                    key={res.resource}
                                    onClick={() => handleTabChange(res)}
                                    className={clsx('subLink', { 'activeSubLink': activeTab?.name === res.name })}
                                >
                                    {res.name}
                                </div>
                            );
                        })}
                    </div>
                    <div className="settingLeftSide w-[80%]">
                        {activeTab ? (
                            <DynamicContent
                                activeTab={activeTab}
                                data={data}
                                fields={activeTab.fields}
                                resource={activeTab.resource}
                            />
                        ) : (
                            <div>Please select a tab to view its content.</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SettingsPage;
