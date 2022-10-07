import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProps } from "../../utils/FormProps";
import { InputWithMaks } from "../InputWithMaks";

type ContactFormData = {
    formProps: FormProps,
    location: string,
    type: string
}

export function ContactForm({ formProps, location, type }: ContactFormData) {

    formProps.setValue(location + ".type", type);

    return (
        <Flex 
            direction="column"
            w="100%">
            <SimpleGrid 
                spacing="4">
                    
                    <InputWithMaks 
                        {...formProps.register(location + ".number")}
                        name= {location + ".number"} 
                        label={type === "CELL_PHONE" ? "Celular" : "Telefone fixo"}
                        mask={type === "CELL_PHONE" ? "(99) 99999-9999": "(99) 9999-9999"} />

            </SimpleGrid>
        </Flex>
    );
}

export default ContactForm;