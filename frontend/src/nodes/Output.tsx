// Output.tsx is a node that will display some text, initially empty
import React, { memo, useState } from 'react';
import BaseNode from "../components/BaseNode";

function OutputNode({ data }) {
  return (
    <BaseNode title="Output"
      handles={[
        { type: 'target'},
        { type: 'source' },
        { type: 'source' },
      ]}
    >
      <input readOnly type="text" className="input input-bordered w-full max-w-xs" />

    </BaseNode>
  );
}
export default memo(OutputNode);












