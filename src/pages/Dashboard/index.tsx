import {Box, Flex, SimpleGrid, Text, theme} from '@chakra-ui/react';
import Chart from 'react-apexcharts';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const options:ApexCharts.ApexOptions = {
  chart: {
    toolbar: { show: false},
    zoom: { enabled: false},
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels:{
    enabled: false
  },
  tooltip:{
    // enabled: false,
    theme: "dark"
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-01',
      '2022-02',
      '2022-03',
      '2022-04',
      '2022-05',
      '2022-06',
      '2022-07',
      '2022-08',
      '2022-09',
      '2022-10',
      '2022-11',
      '2022-12'
    ]
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
};
const series = [
  {
    name: "series1", data: [15,2,31,14,50,26,97,48,19,10,100,200]
  }
];

export function Dashboard() {
  return (
    <Flex 
        direction="column" 
        h="100vh">
        <Header />
        
        <Flex 
            w="100%" 
            my="6" 
            maxW={1480} 
            mx="auto" 
            px="6">
          <Sidebar />

          <SimpleGrid 
              flex="1" 
              gap="4" 
              minChildWidth="320px" 
              alignSelf="flex-start" >
            <Box 
                p="8" 
                bg="gray.700" 
                borderRadius="8" 
                pb="4"
                maxW="550">
              <Text 
                  fontSize="lg" 
                  mb="4"> 
                      Inscritos da semana
                </Text>
              <Chart 
                  type="area" 
                  height={160} 
                  options={options} 
                  series={series}/>
            </Box>
            <Box 
                p="8" 
                bg="gray.700" 
                borderRadius="8" 
                pb="4"
                maxW="550">
                <Text 
                    fontSize="lg" 
                    mb="4"> 
                        Taxa de abertura
                </Text>
              <Chart 
                  type="area" 
                  height={160} 
                  options={options} 
                  series={series}/>
            </Box>
          </SimpleGrid>

        </Flex>
    </Flex>
  );
}

export default Dashboard;