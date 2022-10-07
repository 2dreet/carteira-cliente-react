import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import * as yup from 'yup';
import { FormProps } from "../../utils/FormProps";
import AddressForm, { AddressYup } from "../AddressForm";
import ContactForm from "../ContactForm";
import { Input } from "../Input";

export const PersonYup = { 
    person: yup.object().shape({
        name: yup.string().required("Nome Obrigatório"),
        email: yup.string().required("E-mail Obrigatório").email("Deve ser um E-mail válido"),
        ...AddressYup
    }).default({ })
}

type PersonFormData = {
    formProps: FormProps,
}

export function PersonForm({formProps}: PersonFormData) {
    return (
        <Flex 
            direction="column"
            w="100%">
            <SimpleGrid spacing="4">
                <Input 
                    {...formProps.register("person.name")}
                    error={formProps.error?.name}
                    name="person.name" 
                    label="Nome completo" />
                
                <SimpleGrid 
                    minChildWidth="240px" 
                    spacing="4"
                    w="100%" >
                    
                    <Input 
                        {...formProps.register("person.email")}
                        error={formProps.error?.email}
                        name="person.email" 
                        type="email" 
                        label="E-mail" />

                    <Input 
                        {...formProps.register("person.birthDate")}
                        name="person.birthDate" 
                        type="date" 
                        label="Data de nascimento" />   
                        
                </SimpleGrid>

                
                <AddressForm formProps={formProps} location="person.addresses.0" />

                <HStack spacing="4">
                    <ContactForm formProps={formProps} location="person.contacts.0" type="CELL_PHONE"/>
                    <ContactForm formProps={formProps} location="person.contacts.1" type="FIXED_PHONE"/>
                </HStack>
            </SimpleGrid>
        </Flex>
    );
}

export default PersonForm;