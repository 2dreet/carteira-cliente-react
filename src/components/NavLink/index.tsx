import { Text, Icon, HStack } from '@chakra-ui/react';
import { Link, useLocation } from "react-router-dom"; 
import { IconType } from 'react-icons/lib';

export interface NavLinkprops {
    lable?: string,
    icon?: IconType,
    path: string,
    startWith?: boolean,
}

export function NavLink({lable, icon, path, startWith = false}: NavLinkprops) {

    const {pathname} = useLocation();

    let isActive = pathname === path || (!!startWith && pathname.startsWith(path));

    return (
        <Link to={path} >
            <HStack color={isActive ? "blue.400" : "gray.500"}>
                <Icon 
                    as={icon} 
                    fontSize="20" />
                <Text 
                    ml="4" 
                    fontWeight="medium">
                    {lable}
                </Text>
            </HStack>
        </Link>
    );
}

export default NavLink;