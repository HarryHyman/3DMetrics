import { useState } from 'react'
import './App.css'
import {Button, FileTrigger} from "react-aria-components";

function App() {
  const [file, setFile] = useState<string[] | null | undefined>(null);

  return (
    <>
      <h1>3DMetrics</h1>

      <FileTrigger
          acceptedFileTypes={[".3dmark-result"]}
        onSelect={(e) => {
          if (!e) return;
          const files = Array.from(e);
          const filenames = files.map((file) => file.name);
          setFile(filenames);
          console.log(files);
        }}>
        <Button>Select a file</Button>
      </FileTrigger>
    </>
  )
}

export default App
