import React, { useState, memo } from 'react';
import { Handle, Position } from 'reactflow';

function UploadImageNode() {
const [uploadedImage, setUploadedImage] = useState<string | null>(null);

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
	const file = event.target.files?.[0];
	if (file) {
		const reader = new FileReader();
		reader.onloadend = () => {
			setUploadedImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	}
};

  return (
    <div className="relative p-2 border rounded-md">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      
      {uploadedImage ? (
        <img src={uploadedImage} alt="Uploaded" className="w-full h-32 object-contain" />
      ) : (
        <>
          <label className="block text-center cursor-pointer p-2 border rounded-md bg-gray-200 hover:bg-gray-300">
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </>
      )}
    </div>
  );
}

export default memo(UploadImageNode);
