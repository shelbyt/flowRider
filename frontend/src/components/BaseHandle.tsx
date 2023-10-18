import React from 'react';
import { Handle, Position } from 'reactflow';

function BaseHandle({ type }) {
  const position = type === 'target' ? Position.Left : Position.Right;
  return (
    <Handle type={type} position={position} >
      <div className="w-[200px] text-xs pointer-events-none" style={{ transform: "translate(10px, -40%)" }}>{"VAE"}</div>
    </Handle>
  );
}

export default BaseHandle;