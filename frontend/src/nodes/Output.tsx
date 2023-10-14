// Output.tsx is a node that will display some text, initially empty
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

function OutputNode() {
  const [outputText, setOutputText] = useState('');
  return (
    <div className="relative p-2 border rounded-md">
      <Handle type="target" position={Position.Left} />
      
      <label className="block text-center">
        Output:
        <textarea
          className="mt-2 w-full p-2 border rounded-md"
          value={outputText}
          readOnly
        />
      </label>
    </div>
  );
}

export default memo(OutputNode);














