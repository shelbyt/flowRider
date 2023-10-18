import BaseHandle from "./BaseHandle";

type BaseNodeProps = {
  title: string;
  children: React.ReactNode;
  handles?: { type: 'target' | 'source' }[];
};

function BaseNode({ title, children, handles = [] }: BaseNodeProps) {
  const leftHandles = handles.filter(handle => handle.type === 'target');
  const rightHandles = handles.filter(handle => handle.type === 'source');
const maxHandles = Math.max(leftHandles.length, rightHandles.length);
const paddingValue = 16 * maxHandles;
const paddingTopClass = `pt-${paddingValue}`;


  return (
    <div className="card bordered bg-gray-800 text-white relative w-64">
      <div className="card-top-bar bg-gray-800 text-white text-xs p-2 border-b border-gray-700">
        {title}
      </div>

      {/* Left Handles */}
      {leftHandles.length > 0 && (
        <div className="absolute left-0 top-0 h-full flex flex-col justify-center space-y-4">
          {leftHandles.map((handle, index) => (
            <BaseHandle key={index} type="target" />
          ))}
        </div>
      )}

      {/* Right Handles */}
      {rightHandles.length > 0 && (
        <div className="absolute right-0 top-0 h-full flex flex-col justify-center space-y-4">
          {rightHandles.map((handle, index) => (
            <BaseHandle key={index} type="source" />
          ))}
        </div>
      )}

      <div className={`card-body ${paddingTopClass}`}>
        {children}
      </div>

    </div>
  );
}

export default BaseNode;
