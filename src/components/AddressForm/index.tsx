import {  Button, Flex, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useLoading } from "../../contexts/LoadingContext";
import { useMessageContext } from "../../contexts/MessageContext";
import { Cep } from "../../domain/models/Cep";
import { IBGEService } from "../../services/IBGEService";
import { FormProps } from "../../utils/FormProps";
import { Input } from "../Input";
import { Select, SelectItemProps } from "../Select";
import { InputWithMaks } from "../InputWithMaks";
import * as yup from 'yup';
import { YupUtils } from "../../utils/YupUtils";

const yupUtils = new YupUtils();

export const AddressYup = { 
    addresses: yup.array().of( 
        yup.object().shape({
            street: yupUtils.validateFildNotRequiredMinValue(4, "Rua deve ter pelo menos 4 caracteres"),
            neighborhood: yupUtils.validateFildNotRequiredMinValue(3, "Bairro deve ter pelo menos 3 caracteres"),
            city: yupUtils.validateFildNotRequiredMinValue(4, "Cidade deve ter pelo menos 4 caracteres"),
            state: yupUtils.validateFildNotRequiredMinValue(2, "Estadp deve ter pelo menos 2 caracteres"),
            zipCode: yupUtils.validateFildNotRequiredMinValue(8, "CEP deve ter pelo menos 8 caracteres"),
            type: yup.string(),
            adjunct: yupUtils.validateFildNotRequiredMinValue(3, "Complemento deve ter pelo menos 3 caracteres")
        }).default({})
    ).default([])
}

type AddressFormData = {
    formProps: FormProps,
    location: string
}

const addressTypes: SelectItemProps[] = [
    { key:"RESIDENTIAL", label: "Residencial" },
    { key:"COMMERCIAL", label: "Comercial" },
];

const states: SelectItemProps[] = [
        {key:"AC",label:"Acre"},
        {key:"AL",label:"Alagoas"},
        {key:"AM",label:"Amazonas"},
        {key:"AP",label:"Amapá"},
        {key:"BA",label:"Bahia"},
        {key:"CE",label:"Ceará"},
        {key:"DF",label:"Distrito Federal"},
        {key:"ES",label:"Espírito Santo"},
        {key:"GO",label:"Goiás"},
        {key:"MA",label:"Maranhão"},
        {key:"MG",label:"Minas Gerais"},
        {key:"MS",label:"Mato Grosso do Sul"},
        {key:"MT",label:"Mato Grosso"},
        {key:"PA",label:"Pará"},
        {key:"PB",label:"Paraíba"},
        {key:"PE",label:"Pernambuco"},
        {key:"PI",label:"Piauí"},
        {key:"PR",label:"Paraná"},
        {key:"RJ",label:"Rio de Janeiro"},
        {key:"RN",label:"Rio Grande do Norte"},
        {key:"RO",label:"Rondônia"},
        {key:"RR",label:"Roraima"},
        {key:"RS",label:"Rio Grande do Sul"},
        {key:"SC",label:"Santa Catarina"},
        {key:"SE",label:"Sergipe"},
        {key:"SP",label:"São Paulo"},
        {key:"TO",label:"Tocantins"}];

const ibgeService = new IBGEService();

export function AddressForm({formProps, location}:AddressFormData ) {

    const { showLoading, hideLoading} = useLoading();

    const { setErrorMessage } = useMessageContext();

    async function getCep () {
        try {
            const cep = formProps.getValues(location + ".zipCode");
            if(cep && cep != null && cep.length == 9) {
                showLoading();
                const addressCep:Cep = await ibgeService.getCep(cep);
                if(addressCep && addressCep != null && addressCep.erro === false) {
                    formProps.setValue(location + ".state", addressCep.uf);
                    formProps.setValue(location + ".neighborhood", addressCep.bairro);
                    formProps.setValue(location + ".street", addressCep.logradouro);
                    formProps.setValue(location + ".city", addressCep.localidade);
                } else {
                    setErrorMessage("Cep não localizado.");
                }
            }
        } catch(_e) {
            setErrorMessage("Cep não localizado.");
        }
        hideLoading();
    }

    // eslint-disable-next-line
    useEffect(() => { 
        initAddressForm();
    }, []);

    async function initAddressForm() {
        showLoading();
        try {
            const state = formProps.getValues(location + ".state");
            if(state && state != null && state.length > 0) {
                formProps.setValue(location + ".state", state); 
                formProps.getValues(location + ".city");
            }
        } catch(_e) {
            setErrorMessage("Ocorreu um erro ao carregar as cidades.");
        }
        hideLoading();
    }

    function getError(atribute: string) {
        if(formProps.error && formProps.error.addresses && formProps.error.addresses.length > 0) {
            return formProps.error.addresses[0][atribute];
        }
        return null;
    }

    return (
        <Flex 
            direction="column"
            w="100%">
            <VStack 
                spacing="4">

                    <SimpleGrid 
                        minChildWidth="240px" 
                        spacing="4"
                        w="100%" >

                        <Select
                            {...formProps.register(location + ".type")}
                            label='Tipo do endereço'
                            name= {location + ".type"}
                            itens={addressTypes}/>

                        <InputWithMaks 
                            {...formProps.register(location + ".zipCode")}
                            error={getError("zipCode")}
                            name= {location + ".zipCode"} 
                            label="CEP"
                            mask="99999-999"
                            onKeyDown={ (event) => {
                                if(event.key === "Enter") {
                                    getCep();
                                }
                            } }
                            rightComponent={
                                <Button 
                                    cursor="pointer"
                                    size="lg" 
                                    fontSize="md" 
                                    variant='ghost'
                                    onClick={ getCep } 
                                    _hover={ { background:"none" } }
                                    leftIcon={<Icon as={RiSearchLine} fontSize="20" color="gray.700"/>} />
                            } />
                </SimpleGrid>
                
                <SimpleGrid 
                        minChildWidth="240px" 
                        spacing="4"
                        w="100%" >
                    <Select
                        {...formProps.register(location + ".state")}
                        label='Estado'
                        name= {location + ".state"}
                        itens={states}
                        onChange={(event) => { formProps.setValue(location + ".city", "") }}/>

                    <Input
                        {...formProps.register(location + ".city")}
                        label='Cidade'
                        name= {location + ".city"}/>
                </SimpleGrid>

                <SimpleGrid 
                        minChildWidth="240px" 
                        spacing="4"
                        w="100%" >

                    <Input 
                        {...formProps.register(location + ".neighborhood")}
                        name= {location + ".neighborhood"} 
                        label="Bairro" />
                    <Input 
                        {...formProps.register(location + ".street")}
                        name= {location + ".street" }
                        label="Logradouro" />
                </SimpleGrid >

                <SimpleGrid 
                        minChildWidth="240px" 
                        spacing="4"
                        w="100%" >
                    <Input 
                        {...formProps.register(location + ".number")}
                        name= {location + ".number" }
                        type="number"
                        label="Número" />
                    
                    <Input 
                        {...formProps.register(location + ".adjunct")}
                        name= {location + ".adjunct" }
                        label="Complemento" />
                </SimpleGrid>
            </VStack>
        </Flex>
    );
}

export default AddressForm;