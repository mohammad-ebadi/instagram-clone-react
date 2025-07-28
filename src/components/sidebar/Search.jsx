import { Button, CloseButton, Dialog, Input, Portal } from "@chakra-ui/react";
import SuggestedUser from "../suggestedUsers/SuggestedUser";
import { useState } from "react";
import useSearchUser from "../../hooks/useSearchUser.js";

const Search = () => {
  const {getUserProfile, user , isLoading} = useSearchUser();
  const [ username , setUsername] = useState("")

  const handleSearchUsername = async () => {
  await getUserProfile(username);
};

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" border={"none"}>
          <img src="/search.png"></img>
          Search
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Search</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              
              <Input placeholder="Enter a username..." onChange={(e)=>{setUsername(e.target.value)}}></Input><br /><br />
              {/* if username is exist in the firestore then show suggestedUser component */}
              {isLoading && <p>Loading...</p>}
              {user ? (<SearchResult user={user}></SearchResult>) : (username.length > 0 && <p>User Not Found</p>)}
              
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={()=>{handleSearchUsername()}}>Search</Button>
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

export default Search;
