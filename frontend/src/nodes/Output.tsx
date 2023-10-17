// Output.tsx is a node that will display some text, initially empty
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

function OutputNode({ data }) {
  return (
    <div className="card bordered bg-gray-800 text-white">
      <div className="card-top-bar bg-gray-800 text-white text-xs p-2 border-b border-gray-700">
        OUTPUT
      </div>
      <div className="card-body">
        <input readOnly type="text" className="input input-bordered w-full max-w-xs" />
      </div>
    </div>
  );
}

export default memo(OutputNode);














