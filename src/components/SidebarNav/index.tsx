
import { Stack } from '@chakra-ui/react';
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from 'react-icons/ri';
import NavSection, { NavSectionProps } from '../NavSection';

const navSectionProps:NavSectionProps [] = [
    { 
        label: "GERAL", 
        links: [ 
            { lable: "Dashboard", icon: RiDashboardLine, path: "/" },
            { lable: "Usuários", icon: RiContactsLine, path: "/users", startWith:true}
        ] 
    }, 
    { 
        label: "AUTOMAÇÃO", 
        links: [ 
            { lable: "Formulários", icon: RiInputMethodLine , path: "/users"},
            { lable: "Automação", icon: RiGitMergeLine , path: "/users"}
        ] 
    }
];

export function SidebarNav(){
    return (
        <Stack 
                spacing="12"
                align="flex-start">

                {!! navSectionProps && navSectionProps.map(navSection => 
                    <NavSection 
                        label={navSection.label} 
                        links={navSection.links} 
                        key={navSection.label} />
                )}

            </Stack>
    );
}

export default SidebarNav;