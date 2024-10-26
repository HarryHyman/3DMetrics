import {useLocation} from "react-router-dom";
import "./Results.css"

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
        </>
    )
}

export default Results;