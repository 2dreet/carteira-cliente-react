import { Box, HStack, Stack} from "@chakra-ui/react";
import PaginationItem from "../PaginationItem";

const pages: number[] =[
    1, 2, 3, 4, 5
];

const currentPage: number = 2;

export function Pagination() {
    return(
        <Stack 
            direction={["column", "row"]}
            mt="8" 
            justify="space-between" 
            align="center" 
            spacing="6" >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong> 100 </strong>
            </Box>
            <HStack spacing="2">
                {!!pages && pages.map(page => <PaginationItem key={page} label={page} isCurrent={currentPage === page} />)}
            </HStack>
        </Stack>
    );
}

export default Pagination;