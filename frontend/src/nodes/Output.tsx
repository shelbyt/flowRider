// Output.tsx is a node that will display some text, initially empty
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from "../components/BaseNode";

function OutputNode({ data }) {
  return (
    <BaseNode title="Output">
      <input readOnly type="text" className="input input-bordered w-full max-w-xs" />
    </BaseNode>
  );
}
export default memo(OutputNode);












