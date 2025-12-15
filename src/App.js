import { PipelineToolbar } from './components/Toolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/Submit';
import './index.css';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
