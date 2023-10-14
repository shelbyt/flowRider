import React, { memo } from "react";

function ImageNode({ data }) {
  return (
    <div className="w-56 h-56 transform bg-white px-2 py-2 text-center leading-7 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-blue-100 hover:shadow-2xl">
      
      {/* Image at the top */}
      <div className="w-full h-1/3">
        <img src={data.imageUrl} alt={data.imageAlt} className="object-cover w-full h-full rounded-t-md" />
      </div>

      {/* Large heading in the middle */}
      <div className="w-full h-1/3 flex justify-center items-center">
        <h1 className="text-xl font-bold">{data.heading}</h1>
      </div>

      {/* Description at the bottom */}
      <div className="w-full h-1/3 flex justify-center items-center">
        <p className="text-sm">{data.description}</p>
      </div>

    </div>
  );
}

export default memo(ImageNode);
