import React, { useState } from 'react'
import { cloudinaryEnvironment, cloudinaryUploadPreset } from '../../env';

const useCloudinary = () => {
  const [progress, setProgress] = useState(0);

  const resetProgress = () => {
    setProgress(0);
  }

  const sendCloudinary = async (val: File) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", val);
      formData.append("upload_preset", cloudinaryUploadPreset);
  
      const req = new XMLHttpRequest();
      req.open('POST', `${cloudinaryEnvironment}upload`);
      req.upload.addEventListener('progress', (e) => {
        const percentage = (e.loaded / e.total) * 100;
        setProgress(percentage);
      });
  
      req.addEventListener('load', () => {
        resolve(JSON.parse(req.response));
      });
  
      req.send(formData);
    })
  }

  return {
    progress,
    sendCloudinary,
    resetProgress
  }
}

export default useCloudinary