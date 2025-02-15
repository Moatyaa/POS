'use client'
import React from 'react';
import Team from '../../Components/Team/Team'
import SubLinksHeader from "@/Components/SubLinksHeader/SubLinksHeader";
import SettingContextProvider from "@/Context/SettingsContext";
import {useTranslations} from "use-intl";
function Page() {
    const  t  = useTranslations("sideBarLinks");
    return (
        <section id='team'>
            <div>
                <SubLinksHeader subHeaderTitle={t('Teams')}/>
            </div>
            <SettingContextProvider>
                <Team/>
            </SettingContextProvider>
        </section>
)
    ;
}

export default Page;