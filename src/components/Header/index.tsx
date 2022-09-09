import {Flex, Icon, IconButton, useBreakpointValue} from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import Logo from '../Logo';
import Profile from '../Profile';

export function Header () {

    const { onOpen } = useSidebarDrawer();

    const isMoble = useBreakpointValue({
        base: true,
        lg: false
    });

    return (
        <Flex 
            as="header"
            w="100%" 
            maxWidth={1480} 
            h="20"
            mx="auto"
            mt="4"
            px="8"
            align="center"
            >

            {!!isMoble && 
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="32"
                    mt="1"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="6" />
            }

            <Logo />

            <Profile showName={!isMoble}/> 
            
        </Flex>
    );
}

export default Header;