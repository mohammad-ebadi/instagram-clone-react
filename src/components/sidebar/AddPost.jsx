// import { Button, CloseButton, Dialog, Portal,Input } from "@chakra-ui/react"

// const AddPost = () => {
//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <Button variant="outline" size="sm" color={"white"} bg={"blue.500"}>
//           📌 Add Post
//         </Button>
//       </Dialog.Trigger>
//       <Portal>
//         <Dialog.Backdrop />
//         <Dialog.Positioner>
//           <Dialog.Content>
//             <Dialog.Header>
//               <Dialog.Title>Create Post</Dialog.Title>
//             </Dialog.Header>
//             <Dialog.Body>
//               <Input type="file" border={"none"} cursor={"pointer"}></Input>
//             </Dialog.Body>
//             <Dialog.Footer>
//               <Dialog.ActionTrigger asChild>
//                 <Button variant="outline" color={"white"} bg={"red.500"}>Cancel</Button>
//               </Dialog.ActionTrigger>
//               <Button color={"white"} bg={"blue.500"}>Post</Button>
//             </Dialog.Footer>
//             <Dialog.CloseTrigger asChild>
//               <CloseButton size="sm" />
//             </Dialog.CloseTrigger>
//           </Dialog.Content>
//         </Dialog.Positioner>
//       </Portal>
//     </Dialog.Root>
//   )
// }

// export default AddPost



import { Button, CloseButton, Dialog, Portal, Input } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../config/supabase.jsx";
import useAuthStore from "../../store/useAuthStore.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../../config/firebase.jsx";

const AddPost = () => {
  const { user } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file) => {
    if (!user?.uid) {
      alert("User not logged in!");
      return null;
    }

    try {
      setIsUploading(true);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `${user.uid}/${fileName}`;

      const { error } = await supabase.storage
        .from("post-images")
        .upload(filePath, file);

      if (error) {
        console.error("Upload error:", error.message);
        alert("Upload failed: " + error.message);
        setIsUploading(false);
        return null;
      }

      const { data } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      setIsUploading(false);
      return data.publicUrl;
    } catch (err) {
      console.error("Upload exception:", err.message);
      alert("Upload exception: " + err.message);
      setIsUploading(false);
      return null;
    }
  };

  const handlePost = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const publicUrl = await uploadFile(selectedFile);
    if (!publicUrl) return;

    try {
      // اضافه کردن لینک تصویر به آرایه posts سند کاربر در Firestore
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        posts: arrayUnion(publicUrl),
      });

      alert("Post uploaded and saved successfully!");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating Firestore:", error.message);
      alert("Error saving post info.");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          color={"white"}
          bg={"blue.500"}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "📌 Add Post"}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Post</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                type="file"
                border={"none"}
                cursor={"pointer"}
                onChange={handleFileChange}
                accept="image/*"
                disabled={isUploading}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" color={"white"} bg={"red.500"}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                color={"white"}
                bg={"blue.500"}
                onClick={handlePost}
                disabled={isUploading}
              >
                Post
              </Button>
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

export default AddPost;
