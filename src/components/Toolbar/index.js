import { DraggableNode } from '../DraggableNode';
import { NODE_TYPES } from '../../nodeConfig';
import './toolbar.css';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-content">
        {NODE_TYPES.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
};
