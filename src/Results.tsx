import {useLocation} from "react-router-dom";
import "./Results.css"

function Results() {
    const {state} = useLocation();

    console.log(state);

    return (
        <>
            <div className="score">{state.score}</div>
        </>
    )
}

export default Results;