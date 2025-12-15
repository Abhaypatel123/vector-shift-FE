import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../../zustand/store";
import { shallow } from "zustand/shallow";
import { nodeTypes } from "../../nodeConfig";
import "reactflow/dist/style.css";

const GRID_SIZE = 20;
const PRO_OPTIONS = { hideAttribution: true };

const storeSelector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

// Utility function
const getInitialNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useStore(storeSelector, shallow);


    const handleDrop = useCallback(
        (event) => {
            event.preventDefault();
            const bounds = reactFlowWrapper.current?.getBoundingClientRect();
            const transferData = event.dataTransfer.getData("application/reactflow");

            if (!transferData) return;

            const { nodeType: type } = JSON.parse(transferData);

            if (!type) return;

            const position = reactFlowInstance.project({
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
                id: nodeID,
                type,
                position,
                data: getInitialNodeData(nodeID, type),
            };

            addNode(newNode);
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ width: "100vw", height: "70vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onInit={setReactFlowInstance}
                proOptions={PRO_OPTIONS}
                snapGrid={[GRID_SIZE, GRID_SIZE]}
                connectionLineType="smoothstep"
            >
                <Background color="#aaa" gap={GRID_SIZE} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};
