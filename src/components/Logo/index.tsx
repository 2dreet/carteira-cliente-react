import { Text } from '@chakra-ui/react';

export function Logo(){
    return (
        <Text
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight="bold"
            letterSpacing="tight"
            w="auto">

            GoWallet
            <Text color="pink.500" as="span" ml="1" >.</Text>
        </Text>
    );
}

export default Logo;