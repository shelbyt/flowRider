import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";

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
        className="nodrag mt-1.5 w-full text-xs"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle
        type="source"
        position={Position.Right}
        className="-right-1 h-2.5 w-1.5 rounded-sm bg-gray-500"
      />

      <Handle
        type="target"
        position={Position.Left}
        className="-right-1 h-2.5 w-1.5 rounded-sm bg-gray-500"
      />
    </div>
  );
}

function SelectorNode({ id, data }) {
  return (
    <div className="w-45 rounded-sm bg-gray-100 text-xs text-black shadow-lg">
      <div className="border-b border-gray-300 px-2.5 py-2 text-base">
        <strong> Select Base Model </strong>
      </div>
      <div className="p-2.5">
        <Select nodeId={id} value={data.selectValue} />
      </div>
    </div>
  );
}

export default memo(SelectorNode);
