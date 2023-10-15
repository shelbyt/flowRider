// Output.tsx is a node that will display some text, initially empty
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

function OutputNode({data}) {
  return (
    <div className="relative p-2 border rounded-md">
      <Handle type="target" position={Position.Left} />
      
      <label className="block text-center">
        Output:
        <textarea
          className="mt-2 w-full p-2 border rounded-md text-xs"
          value={data.value}
          readOnly
        />
      </label>
    </div>
  );
}

export default memo(OutputNode);














