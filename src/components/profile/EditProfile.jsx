
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
import { firestore } from "../../config/firebase.jsx"; // مسیر متناسب پروژه
import useAuthStore from "../../store/useAuthStore.js";
import { supabase } from "../../config/supabase.jsx"; // کانفیگ supabase

const EditProfile = () => {
  const { user } = useAuthStore();

  const [newUsername, setNewUsername] = useState("");
  const [newFullname, setNewFullname] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newProfilePicFile, setNewProfilePicFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // برای پیش‌نمایش تصویر جدید
  const [previewUrl, setPreviewUrl] = useState(null);

  // دریافت فایل جدید و ساخت preview URL
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewProfilePicFile(file);

      // آزادسازی URL قبلی برای جلوگیری از نشتی حافظه
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      // تنظیم URL جدید برای پیش‌نمایش
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // حذف تصویر قبلی در Supabase Storage اگر وجود داشت
  const deleteOldProfilePic = async () => {
    if (!user?.profilePicURL) return;
    try {
      // استخراج path از URL
      const url = new URL(user.profilePicURL);
      // فرض می‌کنیم URL به شکل https://xyz.supabase.co/storage/v1/object/public/users/filename است
      // پس path چیزی شبیه users/filename هست
      const pathIndex = url.pathname.indexOf("/users/");
      if (pathIndex === -1) return;
      const path = url.pathname.substring(pathIndex + 1); // حذف اولین "/"
      const { error } = await supabase.storage.from("users").remove([path]);
      if (error) {
        console.error("Error deleting old profile pic:", error.message);
      }
    } catch (err) {
      console.error("Failed to delete old profile pic:", err.message);
    }
  };

  // آپلود عکس جدید در Supabase Storage در bucket users با نام user.uid
  const uploadProfilePic = async (file) => {
    try {
      setIsUploading(true);
      // حذف عکس قبلی
      await deleteOldProfilePic();
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.uid}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error } = await supabase.storage
        .from("users")
        .upload(filePath, file, { upsert: true });
      if (error) {
        console.error("Upload error:", error.message);
        setIsUploading(false);
        return null;
      }
      const { data: publicUrlData } = supabase.storage
        .from("users")
        .getPublicUrl(filePath);
      setIsUploading(false);
      return publicUrlData.publicUrl;
    } catch (err) {
      console.error("Upload exception:", err.message);
      setIsUploading(false);
      return null;
    }
  };

  const handleSave = async () => {
    if (!user || !user.uid) {
      alert("User info is not available.");
      return;
    }
    const updatedFields = {};
    if (newUsername.trim()) updatedFields.userName = newUsername.trim();
    if (newFullname.trim()) updatedFields.fullName = newFullname.trim();
    if (newBio.trim()) updatedFields.bio = newBio.trim();

    try {
      if (newProfilePicFile) {
        const newUrl = await uploadProfilePic(newProfilePicFile);
        if (!newUrl) {
          alert("Failed to upload profile picture.");
          return;
        }
        updatedFields.profilePicURL = newUrl;
      }

      if (Object.keys(updatedFields).length === 0) {
        alert("Please change at least one field to update.");
        return;
      }

      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, updatedFields);

      alert("Successfully saved ✅");

      // ریست فرم‌ها و پاک کردن پیش‌نمایش
      setNewUsername("");
      setNewFullname("");
      setNewBio("");
      setNewProfilePicFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Error updating profile");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          color={"white"}
          bg={"black"}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "📋 Edit Profile"}
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
                <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
                  <Avatar.Root size={"2xl"}>
                    <Avatar.Fallback name="" />
                    {user?.profilePicURL && (
                      <Avatar.Image src={user.profilePicURL} />
                    )}
                  </Avatar.Root>

                  {/* پیش‌نمایش تصویر جدید اگر انتخاب شده */}
                  {previewUrl && (
                    <Avatar.Root size={"2xl"}>
                      <Avatar.Image src={previewUrl} />
                    </Avatar.Root>
                  )}

                  <Input
                    type="file"
                    border={"none"}
                    cursor={"pointer"}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
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
              <Button onClick={handleSave} disabled={isUploading}>
                Save
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

export default EditProfile;

