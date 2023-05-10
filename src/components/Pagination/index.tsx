import { Box, HStack, Stack} from "@chakra-ui/react";
import PaginationItem from "../PaginationItem";

interface PaginationProps {
    setPage(page:number): void,
    pages: number,
    currentPage: number
}

export function Pagination({currentPage, pages, setPage}: PaginationProps) {

    function showPage(page: number) {
        if(page === currentPage 
            || (page + 1 == currentPage) 
            || (page -1 == currentPage)
            || (page === 1 )
            || (page === pages )) {

            return true;
        } 

        return false;
    }

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
                    {
                        if(showPage(page)) {
                            return ( 
                                    <PaginationItem 
                                        key={page} 
                                        label={page} 
                                        isCurrent={currentPage === page}
                                        onClick={() => { setPage(page) }} /> 
                                );
                        } else if(page + 2 == currentPage || page - 2 == currentPage) {
                            return (<strong key={page}>...</strong>);
                        } else {
                            return (<strong key={page}></strong>);
                        }
                    }
                )}
            </HStack>
        </Stack>
    );
}

export default Pagination;