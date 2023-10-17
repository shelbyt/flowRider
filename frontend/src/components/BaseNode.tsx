
function BaseNode({ title, children }) {
  return (
    <div className="card bordered bg-gray-800 text-white">
      <div className="card-top-bar bg-gray-800 text-white text-xs p-2 border-b border-gray-700">
        {title}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

export default BaseNode;
