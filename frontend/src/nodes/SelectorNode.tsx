import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import BaseNode from "../components/BaseNode";

const options = [
  {
    value: "VisionTransformer",
    label: "VisionTransformer",
  },
  {
    value: "ResNet50",
    label: "ResNet50",
  },
  {
    value: "MobileNet V3",
    label: "MobileNet V3",
  },
  {
    value: "AlexNet",
    label: "AlexNet",
  },
];

function Select({ value, nodeId }) {
  console.log("select Node id = ", nodeId)
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selectValue: evt.target.value,
          };
        }

        return node;
      }),
    );
  };
  return (
    <div>
      <select
        className="select select-bordered nodrag mt-1.5 w-full text-xs"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SelectorNode({ id, data }) {
  return (
    <BaseNode title="Model Select" 
       handles={[
        { type: 'target' },
        { type: 'source' },
      ]} 
    >
      <div className="p-2.5">
        <Select nodeId={id} value={data.selectValue} />
      </div>
    </BaseNode>
  );
}

export default memo(SelectorNode);
