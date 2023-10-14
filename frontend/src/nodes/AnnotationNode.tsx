import React, { memo } from "react";

function AnnotationNode({ data }) {
  return (
    <div className="w-56 transform rounded-none border-none bg-white px-2 py-2 text-center leading-7 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-blue-100 hover:shadow-2xl">
      {data.text}
    </div>
  );
}

export default memo(AnnotationNode);
