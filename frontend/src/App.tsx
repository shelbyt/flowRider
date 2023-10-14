import React from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";
import { useState, useCallback } from "react";

import "reactflow/dist/style.css";
import "../tailwind.config.js";
import AnnotationNode from "./nodes/AnnotationNode.tsx";
import SquareAnnotationNode from "./nodes/SquareAnnotationNode.tsx";
import SelectorNode from "./nodes/SelectorNode.tsx";
import PlayPanel from "./actions/play.tsx";
import UploadImage from "./nodes/UploadImage.tsx";

const nodeTypes = {
  annotation: AnnotationNode,
  squareAnnotation: SquareAnnotationNode,
  selector: SelectorNode,
  imageUpload: UploadImage,
};

const initialNodes = [
  // { id: "1", position: { x: 0, y: 0 }, data: { label: "OpenAI" } },
  // {
  //   id: "2",
  //   position: { x: 100, y: 100 },
  //   data: { label: "Text Processer Node" },
  // },
  // { id: "3", position: { x: 200, y: 100 }, data: { label: "Output" } },

  {
    id: "4",
    type: "imageUpload",
    position: { x: 300, y: 50 },
  },
  // {
  //   id: "5",
  //   type: "annotation",
  //   data: { text: "Load dataset from Google Drive" },
  //   position: { x: 100, y: 50 },
  // },
  // {
  //   id: "6",
  //   type: "annotation",
  //   data: { text: "Train model" },
  //   position: { x: 200, y: 50 },
  // },
  // {
  //   id: "7",
  //   type: "squareAnnotation",
  //   data: {
  //     imageUrl: "../images/a11.png",
  //     imageAlt: "Description of Image",
  //     heading: "Detect Objects",
  //     description: "Upload A Few Images and Detect Them! ",
  //   },
  //   position: { x: 200, y: 50 },
  // },
  // {
  //   id: "8",
  //   type: "squareAnnotation",
  //   data: {
  //     imageUrl: "../images/a12.png",
  //     imageAlt: "Description of Image",
  //     heading: "Clone your Voice",
  //     description: "Upload a Sample of Your Voice and Clone it!",
  //   },
  //   position: { x: 200, y: 50 },
  // },

  {
    id: "9",
    type: "selector",
    position: { x: 300, y: 200 },
    data: {
      selectValue: "smoothstep"
    },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "to the",
    type: "step",
    animated: true,
  },
];

const flowKey = "flow-backup-1";

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  const onPlay = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "selector").data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
      >
        <PlayPanel onClick={onPlay} />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
