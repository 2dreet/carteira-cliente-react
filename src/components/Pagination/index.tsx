import { Box, HStack, Stack} from "@chakra-ui/react";
import PaginationItem from "../PaginationItem";

interface PaginationProps {
    setPage(page:number): void,
    pages: number,
    currentPage: number
}

export function Pagination({currentPage, pages, setPage}: PaginationProps) {
    return(
        <Stack 
            direction={["column", "row"]}
            mt="8" 
            justify="space-between" 
            align="center" 
            spacing="6" >
            <Box>
                <strong> </strong>
            </Box>
            <HStack spacing="2">
                {!!pages && pages > 1 && Array.from({length: pages}, (_, i) => i + 1).map(page => 
                    <PaginationItem 
                            key={page} 
                            label={page} 
                            isCurrent={currentPage === page}
                            onClick={() => { setPage(page) }} />
                )}
            </HStack>
        </Stack>
    );
}

export default Pagination;