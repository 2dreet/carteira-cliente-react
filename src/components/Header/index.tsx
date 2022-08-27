import {Flex, useBreakpointValue} from '@chakra-ui/react';
import Logo from '../Logo';
import Profile from '../Profile';
import Search from '../Search';

export function Header () {

    const isMoble = useBreakpointValue({
        base: true,
        lg: false
    })

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
            <Logo />

            {/* {!isMoble && 
                <Search />
            } */}

            <Profile showName={!isMoble}/>
        </Flex>
    );
}

export default Header;