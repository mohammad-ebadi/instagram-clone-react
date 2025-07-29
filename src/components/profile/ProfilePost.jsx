import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  
  Text,
  VStack,
} from "@chakra-ui/react";
import { CommentLogo, NotificationsLogo } from "../../assets/constants.jsx";


import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import Comments from "../comments/Comments.jsx";
import FeedPostFooter from "../feedPosts/FeedPostFooter.jsx";

function ProfilePost({ img }) {
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        position={"relative"}
        aspectRatio={1 / 1}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.500"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Dialog.Root
              size="cover"
              placement="center"
              motionPreset="slide-in-bottom"
            >
              <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                  Open Post
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Post Title</Dialog.Title>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Flex>
                        <Box w={"300px"} aspectRatio={1 / 1}>
                          <Image
                            src={img}
                            alt="Profile post"
                            w={"100%"}
                            h={"100%"}
                            borderRadius={5}
                          ></Image>
                        </Box>
                        <Flex>
                          <Box
                            pl={10}
                            ml={10}
                            display={"flex"}
                            justifyContent={"center"}
                          >
                            <Avatar.Root size={"sm"}>
                              <Avatar.Fallback name="Profile" />
                              <Avatar.Image src="/profile.png" />
                            </Avatar.Root>
                            <Box pl={5} divideX="2px">"username"</Box>
                            <hr /><br />
                            <VStack p={5} m={5} >
                              <Comments createdAt="1d ago" userName="user4" profilePic="/img4.png" text="Text for test 4"></Comments>
                              <Comments createdAt="1d ago" userName="user5" profilePic="/img5.png" text="Text for test 5"></Comments>
                              <Comments createdAt="1d ago" userName="user6" profilePic="/img6.png" text="Text for test 6"></Comments>

                             
                            </VStack>
                            
                          </Box>
                          <hr />
                        </Flex>
                      </Flex>
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        maxW={"300px"}
                      >


                        <FeedPostFooter></FeedPostFooter>
                      </Flex>
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
            <Flex>
              <NotificationsLogo color={"whiteAlpha.700"}></NotificationsLogo>
              <Text fontWeight={"bold"} ml={2} color={"whiteAlpha.700"}>
                7
              </Text>
            </Flex>
            <Flex>
              <CommentLogo color={"whiteAlpha.700"}></CommentLogo>
              <Text fontWeight={"bold"} ml={2} color={"whiteAlpha.700"}>
                9
              </Text>
              <br />
            </Flex>
          </Flex>
        </Flex>

        {/* <img src={img} alt="" /> */}
        <Image
          src={img}
          alt="Profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        ></Image>
      </GridItem>
    </>
  );
}

export default ProfilePost;
