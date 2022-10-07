
import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiDashboardLine, RiContactsLine } from 'react-icons/ri';
import { BsPersonSquare } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { FaWallet } from 'react-icons/fa';
import { MdInventory, MdOutlineLocalGroceryStore } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { useAuthenticationContext } from '../../contexts/AuthenticationContext';
import NavSection, { NavSectionProps } from '../NavSection';

export function SidebarNav(){
    const { user } = useAuthenticationContext();

    const [nav, setNav] = useState<NavSectionProps []>();

    useEffect(() => {
        const navSectionProps:NavSectionProps [] = [];
        navSectionProps.push({
            label: "ADMINISTRAÇÃO", 
            links: [
                { lable: "Dashboard", icon: RiDashboardLine, path: "/" }
            ]
        });

        if(user?.rule && user?.rule === "ADMIN") {
            navSectionProps[0].links.push({ lable: "Usuários", icon: RiContactsLine, path: "/users", startWith: true});
            navSectionProps[0].links.push({ lable: "Vínculo de Usuários", icon: FiUsers, path: "/bind-users", startWith: true});
        }

        navSectionProps.push({ 
            label: "COMERCIAL", 
            links: [  
                { lable: "Clientes", icon: BsPersonSquare , path: "/customers", startWith: true},
                { lable: "Carteira de clientes", icon: FaWallet , path: "/wallet", startWith: true},
                { lable: "Produtos", icon: MdInventory , path: "/products", startWith: true}
            ] 
        });

        navSectionProps.push({ 
            label: "FINANCEIRO", 
            links: [ 
                { lable: "Vendas", icon: MdOutlineLocalGroceryStore , path: "/sales", startWith: true},
                { lable: "Relatórios", icon: HiOutlineDocumentReport , path: "/reports", startWith: true}
            ] 
        });

        setNav(navSectionProps);
    }, []);
    
    return (
        <Stack 
                spacing="12"
                align="flex-start">

                {!! nav && nav.map(navSection => 
                    <NavSection 
                        label={navSection.label} 
                        links={navSection.links} 
                        key={navSection.label} />
                )}

            </Stack>
    );
}

export default SidebarNav;