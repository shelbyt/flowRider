import React, { useState, memo, useEffect } from "react";
import { Handle, Position, useStoreApi, useReactFlow } from "reactflow";
import axios from "axios";

function UploadImageNode({ id }) {
  console.log("node id =========", id);
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/upload/",
          formData,
        );
        console.log(response.data.filename);
        const imageUrl = `http://127.0.0.1:8000/images/${response.data.filename}`;
        setUploadedImage(imageUrl);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  // useEffect to watch for changes in uploadedImage
  useEffect(() => {
    if (uploadedImage) {
      const { nodeInternals } = store.getState();
      console.log("uploaded image  = ", uploadedImage, id);
      setNodes(
        Array.from(nodeInternals.values()).map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              imageUrl: uploadedImage,
            };
          }
          return node;
        }),
      );
    }
  }, [uploadedImage, id, setNodes, store]);

  return (
    <div className="relative p-2 border rounded-md">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Uploaded"
          className="w-full h-32 object-contain"
        />
      ) : (
        <>
          <label className="block text-center cursor-pointer p-2 border rounded-md bg-gray-200 hover:bg-gray-300">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </>
      )}
    </div>
  );
}

export default memo(UploadImageNode);
