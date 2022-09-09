import { Box, Stack, Text} from '@chakra-ui/react';
import NavLink, { NavLinkprops } from '../NavLink';

export interface NavSectionProps {
    label: string,
    links:NavLinkprops []
}

export function NavSection({ label, links }:NavSectionProps){
    return (
        <Box>
            <Text
                fontWeight="bold"
                color="gray.400"
                fontSize="small">
                {label}
            </Text>
            <Stack 
                spacing="4" 
                mt="4" 
                align="stretch">
                 {!!links && links.map(link => 
                    <NavLink 
                        key={link.lable} 
                        lable={link.lable} 
                        icon={link.icon} 
                        path={link.path}
                        startWith={link.startWith}/>
                )}   
            </Stack>
        </Box> 
    );
}

export default NavSection;