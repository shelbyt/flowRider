import React, { useState, memo } from 'react';
import { Handle, Position } from 'reactflow';
import axios from 'axios';

function UploadImageNode() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://127.0.0.1:8000/upload/', formData);
                console.log(response.data.filename)
                const imageUrl = `http://127.0.0.1:8000/images/${response.data.filename}`;
                setUploadedImage(imageUrl);
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
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
