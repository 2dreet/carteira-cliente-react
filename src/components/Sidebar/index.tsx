import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from '@chakra-ui/react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import SidebarNav from '../SidebarNav';

export function Sidebar(){

    const { isOpen, onClose } = useSidebarDrawer();

    const sidebarFloat = useBreakpointValue({
        base: true,
        lg: false
    });

    if(sidebarFloat){
        return(
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerCloseButton />
                        <DrawerHeader color="grey.300">
                                Navegação
                        </DrawerHeader>
                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }

    return(
        <Box 
            as="aside" 
            w="64" 
            mr="8">
            
            <SidebarNav />
        </Box>
    );
}

export default Sidebar;