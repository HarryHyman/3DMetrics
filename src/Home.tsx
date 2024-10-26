import { useState } from 'react'
import './Home.css'
import {Button, FileTrigger} from "react-aria-components";
import {redirect, useNavigate} from "react-router-dom";
import {loadAsync} from "jszip";
import * as cheerio from "cheerio";

function Home() {
  const [file, setFile] = useState<string[] | null | undefined>(null);
  const navigate = useNavigate();

  return (
    <>
      <h1>3DMetrics</h1>

      <FileTrigger
          acceptedFileTypes={[".3dmark-result"]}
        onSelect={async (e) => {
            if (!e) return;
            const files = Array.from(e);
            const filenames = files.map((file) => file.name);
            setFile(filenames);
            console.log(files);

            const zip = await loadAsync(files[0]);

            console.log(zip);

            const result = zip.file("Result.xml");
            if (!result) throw new Error("No result.xml");

            const resultContents = await result.async("string");

            const $ = cheerio.load(resultContents);

            console.log(resultContents);

            navigate("/results", { state: { score: $("TimeSpyPerformance3DMarkScore").text() }});
        }}>
        <Button>Select a file</Button>
      </FileTrigger>
    </>
  )
}

export default Home;
