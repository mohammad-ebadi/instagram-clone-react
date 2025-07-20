import React, { useState } from 'react';
import { supabase } from '../config/supabase';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('لطفاً یک فایل انتخاب کن');
      return;
    }

    setUploading(true);
    setStatus('در حال آپلود...');

    const fileExt = file.name.split('.').pop();
    const fileName =`${Date.now()}.${fileExt}`;

    try {
      const { data, error } = await supabase.storage
        .from('post-images')
        .upload(fileName, file);

      if (error) {
        console.error('خطا در آپلود:', error);
        setStatus(`❌ ارسال عکس ناموفق بود: ${error.message}`);
        setUploading(false);
        return;
      }

      const { data: publicData, error: publicError } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);

      if (publicError) {
        console.error('خطا در گرفتن URL عمومی:', publicError);
        setStatus(`❌ خطا در گرفتن URL عمومی: ${publicError.message}`);
        setUploading(false);
        return;
      }

      setImageUrl(publicData.publicUrl);
      setStatus('✅ آپلود موفق');
    } catch (e) {
      console.error('خطای غیرمنتظره:', e);
      setStatus(`❌ خطای غیرمنتظره: ${e.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3>آپلود عکس به Supabase</h3>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ marginTop: '10px', padding: '10px 20px' }}
      >
        {uploading ? 'در حال آپلود...' : 'ارسال عکس'}
      </button>

      <p>{status}</p>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>🔗 لینک تصویر:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <br />
          <img
            src={imageUrl}
            alt="آپلود شده"
            style={{ maxWidth: '300px', marginTop: '10px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;