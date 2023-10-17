import React from 'react';
import { Handle, Position } from 'reactflow';

function BaseHandle({ type }) {
  const position = type === 'target' ? Position.Left : Position.Right;
  return (
    <Handle type={type} position={position} >
        </Handle>
  );
}

export default BaseHandle;