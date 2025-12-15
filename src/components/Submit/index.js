import './submit.css';
import { useStore } from '../../zustand/store';
import { shallow } from 'zustand/shallow';
import { useApi } from '../CustomHooks/useApi';
import { parsePipeline } from '../../Api/api';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const { request, loading } = useApi(parsePipeline);

  const handleSubmit = async () => {
    try {
      const result = await request(nodes, edges);
      alert(
        `Pipeline Parsed!\n\n` +
          `Nodes: ${result.num_nodes}\n` +
          `Edges: ${result.num_edges}\n` +
          `Is DAG: ${result.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert(' Error: ' + err.message);
    }
  };

  return (
    <div className="submitContainer">
      <button type="submit" className="submitButton" onClick={handleSubmit}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};
