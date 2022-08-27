import { Box, Stack, Text, Link, Icon } from '@chakra-ui/react';
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from 'react-icons/ri';
import NavSection, { NavSectionProps } from '../NavSection';

const navSectionProps:NavSectionProps [] = [
    { 
        label: "GERAL", 
        links: [ 
            { lable: "Dashboard", icon: RiDashboardLine },
            { lable: "Usuários", icon: RiContactsLine }
        ] 
    }, 
    { 
        label: "AUTOMAÇÃO", 
        links: [ 
            { lable: "Formulários", icon: RiInputMethodLine },
            { lable: "Automação", icon: RiGitMergeLine }
        ] 
    }
];

export function Sidebar(){

    return(
        <Box 
            as="aside" 
            w="64" 
            mr="8">
            
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
        </Box>
    );
}

export default Sidebar;