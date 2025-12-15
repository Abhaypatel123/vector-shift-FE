import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';
import { useStore } from '../../zustand/store';
import { FieldType } from '../FieldType';
import { getNodeDefaultValue, extractVariables } from '../../utils/nodeUtils';
import { shallow } from 'zustand/shallow';
import { getNodeCardStyle } from '../../utils/nodeStyles';

export const BaseNode = ({ id, data, config }) => {
  const { removeNode, updateNodeField } = useStore(
    (state) => ({
      removeNode: state.removeNode,
      updateNodeField: state.updateNodeField,
    }),
    shallow
  );

  const initialValues = Object.fromEntries(
    (config.fields || []).map((f) => {
      if (f.name === 'name') {
        return [f.name, getNodeDefaultValue(data) || f.default || ''];
      }
      return [f.name, f.default || ''];
    })
  );

  const [fieldValues, setFieldValues] = useState(initialValues);

  const [size, setSize] = useState({ width: 300, height: 150 });
  const [variableHandles, setVariableHandles] = useState([]);

  useEffect(() => {
    if (config.type === 'text') {
      const text = fieldValues.text || '';

      const lines = text.split('\n').length;
      const width = Math.min(400, Math.max(200, text.length * 7));
      const height = Math.min(300, Math.max(200, lines * 24));
      setSize({ width, height });

      const vars = extractVariables(text);
      const newHandles = vars.map((v, idx) => ({
        type: 'target',
        position: 'Left',
        id: v,
        style: { top: `${40 + idx * 20}px` },
      }));

      setVariableHandles(newHandles);
    }
  }, [fieldValues, config]);

  const handleFieldChange = (key, value) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
    updateNodeField(id, key, value);
  };

  const handleRemoveNode = () => removeNode(id);

  return (
    <div className="node-card" style={getNodeCardStyle(config, size)}>
      <button className="node-card-remove-btn" onClick={handleRemoveNode}>
        ✖
      </button>

      {/* Header */}
      <div className="node-card-header">
        {config.icon && <span className="node-card-icon">{config.icon}</span>}
        <span className="node-card-title">{config.label}</span>
      </div>

      {/* Fields */}
      {config?.fields.length > 0 ? (
        <FieldType
          config={config}
          fieldValues={fieldValues}
          onChangeField={handleFieldChange}
          id={id}
        />
      ) : (
        <span className="default-field-text">This is {config.label}</span>
      )}

      {/* Handles */}
      {[...config.handles, ...variableHandles].map((h, idx) => (
        <Handle
          key={idx}
          type={h.type}
          position={Position[h.position]}
          id={`${id}-value`}
          className="node-card-handle"
          style={h.style || {}}
        />
      ))}
    </div>
  );
};
