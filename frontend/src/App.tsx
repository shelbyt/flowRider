import React, { useEffect } from "react";
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
import axios from "axios";

import "reactflow/dist/style.css";
import "../tailwind.config.js";
import AnnotationNode from "./nodes/AnnotationNode.tsx";
import SquareAnnotationNode from "./nodes/SquareAnnotationNode.tsx";
import SelectorNode from "./nodes/SelectorNode.tsx";
import PlayPanel from "./actions/play.tsx";
import UploadImage from "./nodes/UploadImage.tsx";
import Output from "./nodes/Output.tsx";
import {NodeTest, NodeTest1} from "./nodes/NodeTest.tsx";

const nodeTypes = {
  annotation: AnnotationNode,
  squareAnnotation: SquareAnnotationNode,
  selector: SelectorNode,
  imageUpload: UploadImage,
  textOutput: Output,
  bnt: NodeTest,
  bnt1: NodeTest1,
};

const initialNodes = [

  {
    id: "999",
    type: "bnt",
    position: { x: 100, y: 200 },
  },

  {
    id: "3999",
    type: "bnt1",
    position: { x: 200, y: 200 },
  },
  {
    id: "4",
    type: "imageUpload",
    position: { x: 100, y: 200 },
    data: { imageUrl: "" },
  },
  {
    id: "9",
    type: "selector",
    position: { x: 300, y: 200 },
    data: {
      selectValue: "VisionTransformer",
    },
  },
  {
    id: "11",
    type: "textOutput",
    position: { x: 300, y: 500 },
    data: {
      value: ""
    }
  },

];
const initialEdges = [
  {
    id: "e1-2",
    source: "4",
    target: "9",
    type: "step",
    animated: true,
  },
  {
    id: "e2-3",
    source: "9",
    target: "11",
    type: "step",
    animated: true,
  },
];

const flowKey = "flow-backup-1";

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [outputText, setOutputText] = useState<String>("");
  const [rfInstance, setRfInstance] = useState(null);


  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'textOutput') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            value: outputText,
          };
        }

        return node;
      })
    );
  }, [outputText, setNodes]);

  const onPlay = useCallback(() => {
    console.log(rfInstance)
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const flowString = JSON.stringify(flow);
      localStorage.setItem(flowKey, flowString);
      // Send the flow data to the backend
      axios
        .post("http://127.0.0.1:8000/play/", flowString, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          setOutputText(response.data.graph);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
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
