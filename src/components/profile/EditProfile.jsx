// import {
//   Avatar,
//   Box,
//   Button,
//   CloseButton,
//   Container,
//   Dialog,
//   Flex,
//   Input,
//   Portal,
// } from "@chakra-ui/react";
// import useAuthStore from "../../store/useAuthStore.js";

// const EditProfile = () => {
//   const { user } = useAuthStore();
//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <Button variant="outline" size="sm" color={"white"} bg={"black"}>
//           Edit Profile
//         </Button>
//       </Dialog.Trigger>
//       <Portal>
//         <Dialog.Backdrop />
//         <Dialog.Positioner>
//           <Dialog.Content>
//             <Dialog.Header>
//               <Dialog.Title>Your Profile Informations</Dialog.Title>
//             </Dialog.Header>
//             <Dialog.Body>
//               <Container>
//                 <Flex justifyContent={"center"} alignItems={"center"}>
//                   <Avatar.Root size={"2xl"}>
//                     <Avatar.Fallback name="" />
//                     <Avatar.Image src="" />
//                   </Avatar.Root>
//                   <Input type="file" border={"none"} cursor={"pointer"}></Input>
//                 </Flex>

//                 <br />
//                 <br />

//                 <label>Current Username : {user?.userName}</label>
//                 <Input placeholder="New Username..." type="text"></Input>
//                 <br />
//                 <br />
//                 <label>Current Fullname : {user?.fullName}</label>
//                 <Input placeholder="New Fullname..." type="text"></Input>
//                 <br />
//                 <br />

//                 <label>Current Bio : {user?.bio}</label>
//                 <Input placeholder="New Bio..." type="text"></Input>
//               </Container>
//             </Dialog.Body>
//             <Dialog.Footer>
//               <Dialog.ActionTrigger asChild>
//                 <Button variant="outline">Cancel</Button>
//               </Dialog.ActionTrigger>
//               <Button>Save</Button>
//             </Dialog.Footer>
//             <Dialog.CloseTrigger asChild>
//               <CloseButton size="sm" />
//             </Dialog.CloseTrigger>
//           </Dialog.Content>
//         </Dialog.Positioner>
//       </Portal>
//     </Dialog.Root>
//   );
// };

// export default EditProfile;

// import {
//   Avatar,
//   Box,
//   Button,
//   CloseButton,
//   Container,
//   Dialog,
//   Flex,
//   Input,
//   Portal,
//   Textarea,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import useAuthStore from "../../store/useAuthStore.js";
// import { firestore } from "../../config/firebase.jsx"; // اطمینان حاصل کن که مسیر درست باشه
// import { doc, updateDoc } from "firebase/firestore";

// const EditProfile = () => {
//   const { user } = useAuthStore();

//   const [newUsername, setNewUsername] = useState("");
//   const [newFullname, setNewFullname] = useState("");
//   const [newBio, setNewBio] = useState("");

//   const handleSave = async () => {
//     if (!newUsername.trim() || !newFullname.trim()) {
//       return;
//     }

//     try {
//       const userRef = doc(firestore, "users", user.uid);
//       await updateDoc(userRef, {
//         userName: newUsername,
//         fullName: newFullname,
//         bio: newBio,
//       });
//       alert("Successfully saved ✅")

//     } catch (error) {
//       console.error("Error updating profile:", error.message);
//       alert("Error")
//     }
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <Button variant="outline" size="sm" color={"white"} bg={"black"}>
//           Edit Profile
//         </Button>
//       </Dialog.Trigger>
//       <Portal>
//         <Dialog.Backdrop />
//         <Dialog.Positioner>
//           <Dialog.Content>
//             <Dialog.Header>
//               <Dialog.Title>Your Profile Informations</Dialog.Title>
//             </Dialog.Header>
//             <Dialog.Body>
//               <Container>
//                 <Flex justifyContent={"center"} alignItems={"center"}>
//                   {/* <Avatar name={user?.fullName} size="2xl" /> */}
//                   <Avatar.Root size={"2xl"}>
//                     <Avatar.Fallback name=""/>
//                     <Avatar.Image src="" />
//                   </Avatar.Root>
//                   <Input type="file" border={"none"} cursor={"pointer"} />
//                 </Flex>

//                 <br />
//                 <label>Current Username: {user?.userName}</label>
//                 <Input
//                   placeholder="New Username..."
//                   type="text"
//                   value={newUsername}
//                   onChange={(e) => setNewUsername(e.target.value)}
//                 />

//                 <br />
//                 <br />
//                 <label>Current Fullname: {user?.fullName}</label>
//                 <Input
//                   placeholder="New Fullname..."
//                   type="text"
//                   value={newFullname}
//                   onChange={(e) => setNewFullname(e.target.value)}
//                 />

//                 <br />
//                 <br />
//                 <label>Current Bio: {user?.bio || "No bio yet"}</label>
//                 <Textarea
//                   placeholder="New Bio..."
//                   value={newBio}
//                   onChange={(e) => setNewBio(e.target.value)}
//                 />
//               </Container>
//             </Dialog.Body>
//             <Dialog.Footer>
//               <Dialog.ActionTrigger asChild>
//                 <Button variant="outline">Cancel</Button>
//               </Dialog.ActionTrigger>
//               <Button onClick={handleSave}>Save</Button>
//             </Dialog.Footer>
//             <Dialog.CloseTrigger asChild>
//               <CloseButton size="sm" />
//             </Dialog.CloseTrigger>
//           </Dialog.Content>
//         </Dialog.Positioner>
//       </Portal>
//     </Dialog.Root>
//   );
// };

// export default EditProfile;

import {
  Avatar,
  Button,
  CloseButton,
  Container,
  Flex,
  Input,
  Portal,
  Textarea,
  Dialog,
} from "@chakra-ui/react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.jsx"; // مسیر رو متناسب با پروژه‌ات اصلاح کن

const EditProfile = ({ user }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newFullname, setNewFullname] = useState("");
  const [newBio, setNewBio] = useState("");

  const handleSave = async () => {
    const updatedFields = {};

    if (newUsername.trim()) updatedFields.userName = newUsername.trim();
    if (newFullname.trim()) updatedFields.fullName = newFullname.trim();
    if (newBio.trim()) updatedFields.bio = newBio.trim();

    if (Object.keys(updatedFields).length === 0) {
      alert("Please change at least one field to update.");
      return;
    }

    try {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, updatedFields);
      alert("Successfully saved ✅");

      // ریست کردن فیلدهای فرم
      setNewUsername("");
      setNewFullname("");
      setNewBio("");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Error");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" color={"white"} bg={"black"}>
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
                  <Input type="file" border={"none"} cursor={"pointer"} />
                </Flex>
                <br />
                <label>Current Username: {user?.userName}</label>
                <Input
                  placeholder="New Username..."
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <br />
                <br />
                <label>Current Fullname: {user?.fullName}</label>
                <Input
                  placeholder="New Fullname..."
                  type="text"
                  value={newFullname}
                  onChange={(e) => setNewFullname(e.target.value)}
                />
                <br />
                <br />
                <label>Current Bio: {user?.bio || "No bio yet"}</label>
                <Textarea
                  placeholder="New Bio..."
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                />
              </Container>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSave}>Save</Button>
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
