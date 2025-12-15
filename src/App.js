import { PipelineToolbar } from './components/Toolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/Submit';
import './index.css';

function App() {
  return (
    <>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </>
  );
}

export default App;
