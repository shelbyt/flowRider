import React from 'react';
import { Handle, Position, HandleType } from 'reactflow';

interface BaseNodeTestProps {
  data: {
    name: string;
    inputs: string[];
    outputs: string[];
  };
}

export const BaseNodeTest1: React.FC<BaseNodeTestProps> = ({ data }) => {
  return (
    <div className="card bordered bg-gray-800 text-white relative w-64 flex flex-col">
      
      {/* Title Row */}
      <div className="card-title p-2">
        {data.name}
      </div>

      {/* Handles Row */}
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-col">
          {data.inputs.map((input) => (
            <BaseHandleTest1 key={input} label={input} type="target" position={Position.Left} />
          ))}
        </div>
        <div className="flex flex-col">
          {data.outputs.map((output) => (
            <BaseHandleTest1 key={output} label={output} type="source" position={Position.Right} />
          ))}
        </div>
      </div>

      {/* Additional Content Row */}
      <div className="card-body p-2 flex-grow">
	      <input readOnly type="text" className="input input-bordered w-full max-w-xs" />
        {/* Other node content can be added here */}
      </div>

    </div>
  );
};


export const BaseNodeTest2: React.FC<BaseNodeTestProps> = ({ data }) => {
	  return (
    <div className="card bordered bg-gray-800 text-white">
      <div className="card-title">
        {data.name}
      </div>
      <div className="card-body flex justify-between">
        <div className="flex flex-col">
          {data.inputs.map((input) => (
            <BaseHandleTest1 key={input} label={input} type="target" position={Position.Left} />
          ))}
        </div>
        <div className="flex flex-col">
          {data.outputs.map((output) => (
            <BaseHandleTest1 key={output} label={output} type="source" position={Position.Right} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface BaseHandleTestProps {
  label: string;
  type: HandleType;
  position: Position;
}

const BaseHandleTest1: React.FC<BaseHandleTestProps> = ({ label, type, position }) => {
	  return (
    <div className={position === Position.Right ? 'flex flex-row-reverse' : 'flex'}>
      <Handle 
        type={type} 
        position={position} 
        className="w-3 h-3 bg-blue-500 relative" 
      />
      <span className="text-xs ml-2">{label.toUpperCase()}</span>
    </div>
  );
};

export const BaseNodeTest: React.FC<BaseNodeTestProps> = ({ data }) => {
  return (
    <div className="card bordered bg-gray-800 text-white relative w-64 flex flex-row justify-between">
      <div className="flex flex-col">
        {data.inputs.map((input) => (
          <BaseHandleTest key={input} label={input} type="target" position={Position.Left} />
        ))}
      </div>
      <div className="card-body p-2 flex-grow">
        <div className="card-title">
          {data.name}
        </div>
        {/* Other node content can be added here */}
      </div>
      <div className="flex flex-col">
        {data.outputs.map((output) => (
          <BaseHandleTest key={output} label={output} type="source" position={Position.Right} />
        ))}
      </div>
    </div>
  );
};

const BaseHandleTest: React.FC<BaseHandleTestProps> = ({ label, type, position }) => {
  return (
    <div className={`flex ${position === Position.Right ? 'flex-row-reverse' : ''} items-center`}>
      <Handle 
        type={type} 
        position={position} 
        className="w-3 h-3 bg-blue-500 relative" 
      />
      <span className="text-xs ml-2">{label.toUpperCase()}</span>
    </div>
  );
};

