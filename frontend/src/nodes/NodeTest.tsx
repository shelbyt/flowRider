// Output.tsx is a node that will display some text, initially empty
import React, { memo, useState } from 'react';
import {BaseNodeTest, BaseNodeTest1} from '../components/BaseNodeTest';

export const NodeTest: React.FC = () => {
  const nodeData = {
    name: "Sample Node",
    inputs: ["Input1"],
    outputs: ["Output1", "Output2"]
  };

  return (
    <div className="p-10">
      <BaseNodeTest data={nodeData} />
    </div>
  );
};


export const NodeTest1: React.FC = () => {
  const nodeData = {
    name: "Sample Node",
    inputs: ["Input1"],
    outputs: ["Output1", "Output2"]
  };

  return (
    <div className="p-10">
      <BaseNodeTest1 data={nodeData} />
    </div>
  );
};









