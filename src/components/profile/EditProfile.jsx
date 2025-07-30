import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Container,
  Dialog,
  Flex,
  Input,
  Portal,
} from "@chakra-ui/react";
import useAuthStore from "../../store/useAuthStore.js";

const EditProfile = () => {
  const { user } = useAuthStore();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Edit Profile
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Your Profile Informations</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Container>
                <Flex justifyContent={"center"} alignItems={"center"}>
                  <Avatar.Root size={"2xl"}>
                    <Avatar.Fallback name="" />
                    <Avatar.Image src="" />
                  </Avatar.Root>
                  <Input type="file" border={"none"} cursor={"pointer"}></Input>
                </Flex>

                <br />
                <br />

                <label>Current Username : {user?.userName}</label>
                <Input placeholder="New Username..." type="text"></Input>
                <br />
                <br />
                <label>Current Fullname : {user?.fullname}</label>
                <Input placeholder="New Fullname..." type="text"></Input>
                <br />
                <br />

                <label>Current Bio : {user?.bio}</label>
                <Input placeholder="New Bio..." type="text"></Input>
              </Container>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EditProfile;
