import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './suggestedUser'

function SuggestedUsers() {
  return (
    <VStack py={8} px={6} gap={4}>
       <SuggestedHeader></SuggestedHeader> 
       <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
         <Text fontSize={12} fontWeight={"bold"} color={"gray.500"} >
            Suggested Users
         </Text>
         <Text fontSize={12} fontWeight={"bold"}  cursor={"pointer"} _hover={{color:"blue.500"}}>
            See all
         </Text>
       </Flex>

       <SuggestedUser username="user5" followers={234} avatar="/img5.png"></SuggestedUser>
       <SuggestedUser username="user6" followers={646} avatar="/img6.png"></SuggestedUser>
       <SuggestedUser username="user7" followers={8697} avatar="/img7.png"></SuggestedUser>
       


       <Box fontSize={12} color={"gray.500"} mt={5}>
        © 2025 Built by Mohammad Ebadi

       </Box>
      
    </VStack>
  )
}

export default SuggestedUsers
