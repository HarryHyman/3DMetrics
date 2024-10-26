import {useLocation} from "react-router-dom";
import "./Results.css"
import Chart from "./Chart.tsx";

function Results() {
    const {state} = useLocation();

    console.log(state);

    return (
        <>
            <div className="score__circle">
                <div className="score__title">OVERALL</div>
                <div className="score">{state.scores.overall}</div>
            </div>


            <div className="subscore__container">
                <div className="subscore">
                    <div className="score__title">CPU</div>
                    <div className="subscore__text">{state.scores.cpu}</div>
                </div>
                <div className="subscore">
                    <div className="score__title">Graphics</div>
                    <div className="subscore__text">{state.scores.gpu}</div>
                </div>
            </div>

            <div className="info">
                <div className="info2">{state.systemInfo.computerName}</div>
                <div className="info2">{state.systemInfo.date.toString()}</div>
            </div>

            <Chart data={{gpuTemperature: state.data["GPUZ/GpuTemperature/0/2:"]}}></Chart>
        </>
    )
}

export default Results;