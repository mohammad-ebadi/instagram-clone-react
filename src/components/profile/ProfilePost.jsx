import React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  GridItem,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function ProfilePost({ img }) {
  const [isOpen, onOpen, onClose] = useDisclosure()
  return (
    <>
    <GridItem
      cursor={"pointer"}
      borderRadius={4}
      overflow={"hidden"}
      border={"1px solid"}
      position={"relative"}
      aspectRatio={1 / 1}
      onClick={onOpen}
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
        <Flex></Flex>
      </Flex>
      <img src={img} alt="" />
    </GridItem>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            hey this the model
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
    
  );
}

export default ProfilePost;
