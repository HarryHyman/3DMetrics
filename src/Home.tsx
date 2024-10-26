import { useState } from 'react'
import './Home.css'
import {Button, FileTrigger} from "react-aria-components";
import {redirect, useNavigate} from "react-router-dom";
import {loadAsync} from "jszip";
import * as cheerio from "cheerio";
import * as JSZip from "jszip";

async function readResult(zip: JSZip) {
    const result = zip.file("Result.xml");
    if (!result) throw new Error("No result.xml");

    const resultContents = await result.async("string");

    const $ = cheerio.load(resultContents);

    return {
        scores: {
            overall: $("TimeSpyPerformance3DMarkScore").text(),
            cpu: $("TimeSpyPerformanceCPUScore").text(),
            gpu: $("TimeSpyPerformanceGraphicsScore").text()
        }
    }
}

async function readSI(zip: JSZip) {
    const SI = zip.file("SI.xml");
    if (!SI) throw new Error("No SI.xml");

    const SIContents = await SI.async("string");

    const $ = cheerio.load(SIContents);

    return {
        systemInfo: {
            computerName: $("Computer_Name").text(),
            date: $("RTC").text(),
        }
    }
}

async function readMonitoringData(zip: JSZip) {
    const monitoringData = zip.file("RawMonitoringData.json");
    if (!monitoringData) throw new Error("No RawMonitoringData.json");

    const monitoringDataContents = await monitoringData.async("text");

    const monitoringDataJson = JSON.parse(monitoringDataContents);

    return {
        data: {
            ...monitoringDataJson
        }
    }
}

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

            const result = await readResult(zip);
            const si = await readSI(zip);
            const monitoringData = await readMonitoringData(zip);

            const state = {
                ...result,
                ...si,
                ...monitoringData
            }

            navigate("/results", { state });
        }}>
        <Button>Select a file</Button>
      </FileTrigger>
    </>
  )
}

export default Home;
