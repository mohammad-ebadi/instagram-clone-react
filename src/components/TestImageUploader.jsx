import React, { useState } from "react";
import { supabase } from "../config/supabase";
import { Button } from "@chakra-ui/react";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please choose a file");
      return;
    }

    setUploading(true);
    setStatus("Uploading");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    try {
      const { error } = await supabase.storage
        .from("post-images")
        .upload(fileName, file);

      if (error) {
        // console.error("خطا در آپلود:", error);
        setStatus(`❌ Somthing went wrong!: ${error.message}`);
        setUploading(false);
        return;
      }

      const { data: publicData, error: publicError } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      if (publicError) {
        // console.error("خطا در گرفتن URL عمومی:", publicError);
        setStatus(`❌Error : ${publicError.message}`);
        setUploading(false);
        return;
      }

      setImageUrl(publicData.publicUrl);
      setStatus("✅ Uploaded");
    } catch (e) {
      // console.error("خطای غیرمنتظره:", e);
      setStatus(`❌  Error : ${e.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Uploading the file</h3>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <Button
        onClick={handleUpload}
        disabled={uploading}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        {uploading ? " Uploading " : " Sending File"}
      </Button>

      <p>{status}</p>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>🔗Link:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <br />
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
