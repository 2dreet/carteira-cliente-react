import { Flex, Button, Stack, Icon, VStack} from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {Input} from '../../components/Input'
import Logo from '../../components/Logo';
import { useAuthenticationContext } from '../../contexts/AuthenticationContext';
import { useEffect } from 'react';
import { useMessageContext } from '../../contexts/MessageContext';

type LoginFormData = {
  login: string,
  password: string
};

const loginFormSchema = yup.object().shape({
  login: yup.string().required("Usuário obrigatório"),
  password: yup.string().required("Senha obrigatória"),
})


export function Login() {

  const { setErrorMessage } = useMessageContext();

  const { register, handleSubmit, formState } = useForm<LoginFormData>({ resolver: yupResolver(loginFormSchema) });

  const { authenticate, logOut, expired, setExpired } = useAuthenticationContext();

  useEffect(() => {
    logOut(false);
  }, []);

  useEffect(() => {
     if(expired === true) {
        setErrorMessage("Sessão expirada! favor realizar o login navamente!");
        setExpired(false);
     }
  }, [expired]);
  
  const handleLogin: SubmitHandler<LoginFormData> = async (formData) => {
      authenticate(formData.login, formData.password);
  }

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

      <VStack 
            spacing="8"
            bg={"gray.700"} 
            maxW={360} 
            w={"100%"} 
            p="8" 
            borderRadius={8} >

          <Flex 
            as={"form"} 
            flexDirection="column"
            onSubmit={handleSubmit(handleLogin)}>

            <Stack spacing={4}>
                <Input 
                  {...register("login")}
                  name="login" 
                  label="Usuário"
                  error={formState.errors.login}/>
            
                <Input 
                  {...register("password")}
                  name="password" 
                  label="Senha"
                  type="password"
                  error={formState.errors.password}/>
              
            </Stack>

            <Button 
              type="submit" 
              mt="6" 
              colorScheme="blue"
              leftIcon={<Icon as={MdLogin} fontSize="20" />}
              isLoading={formState.isSubmitting}> 
                Entrar 
            </Button>
          </Flex>
        
          {/* <CreateButton 
             type="submit" 
             label="Criar conta" />  */}
      </VStack>
    </Flex>  
  );
}

export default Login;