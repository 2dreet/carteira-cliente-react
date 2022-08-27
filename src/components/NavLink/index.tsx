import { Text, Link, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';


export interface NavLinkprops {
    lable: string,
    icon: IconType
}

export function NavLink({lable, icon}: NavLinkprops) {
    return (
        <Link display="flex">
            <Icon 
                as={icon} 
                fontSize="20" />
            <Text 
                ml="4" 
                fontWeight="medium">
                {lable}
            </Text>
        </Link>
    );
}

export default NavLink;