'use client'
import React from 'react';
import Team from '../../Components/Team/Team'
import SubLinksHeader from "@/Components/SubLinksHeader/SubLinksHeader";
import SettingContextProvider from "@/Context/SettingsContext";
function Page() {
    return (
        <section id='team'>
            <div>
                <SubLinksHeader subHeaderTitle={'Teams'}/>
            </div>
            <SettingContextProvider>
                <Team/>
            </SettingContextProvider>
        </section>
)
    ;
}

export default Page;