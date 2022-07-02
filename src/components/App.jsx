import React, { useState } from "react";
import Main from "./Main";
import Quiz from "./Quiz";

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    function startQuiz() {
        setHasStarted(true);
    }

    return (
        <div className="main">
            <div className="background">
                <img src="/images/blob1.png" className="blob1"></img>
                <img src="/images/blob2.png" className="blob2"></img>
            </div>
            {
                // !hasStarted ? 
                // <>
                //     <Main />
                //     <button 
                //         className="start"
                //         onClick={startQuiz}
                //     >
                //         Start Quiz
                //     </button>
                // </> :
                <Quiz />
            }
        </div>
    );
};

export default App;