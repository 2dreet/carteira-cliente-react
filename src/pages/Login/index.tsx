import { Flex, Button, Stack, Text, Box, Icon} from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';
import CreateButton from '../../components/Buttons/CreateButton';

import Input from '../../components/Input'
import Logo from '../../components/Logo';

export function Login() {
  return (
    <Flex 
      w={'100vw'} 
      h={'100vh'} 
      align="center" 
      justify={"center"}
      direction="column"
      >

      <Flex 
          w="100%" 
          alignItems="center" 
          flexDirection="column" 
          p="2">  
          <Logo /> 
      </Flex>

      <Flex 
        as={"form"} 
        w={"100%"} 
        maxW={360} 
        bg={"gray.700"} 
        p="8" 
        borderRadius={8} 
        flexDirection="column">

        <Stack spacing={4}>
            <Input 
              name="login" 
              label="Usuário"/>
         
            <Input 
              name="password" 
              label="Senha"
              type="password"/>
          
        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          colorScheme="blue"
          leftIcon={<Icon as={MdLogin} fontSize="20" />}> 
            Entrar 
        </Button>

        <CreateButton 
          type="submit" 
          mt="3" 
          label="Criar conta" /> 
      </Flex>
    </Flex>  
  );
}

export default Login;