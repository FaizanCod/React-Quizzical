import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
// import { data } from "../data";

function Quiz() {
    function b64_to_utf8( str ) {
        return decodeURIComponent(escape(window.atob( str )));
    }

    function handleCallback(index, id, isCorrect) {
        let flag = false;
        setAnswers(prevValue => {
            for (let i = 0; i < prevValue.length; i++) {
                if (prevValue[i].quesId === id) {
                    prevValue[i].answerChosen = index;
                    prevValue[i].isCorrect = isCorrect;
                    flag = true;
                }
            }
            if (flag)
                return prevValue;
            // console.log('prevValue: ', prevValue);
            return [
                ...prevValue,
                {
                    quesId: id,
                    answerChosen: index,
                    isCorrect: isCorrect
                }
            ]
        });
    }

    const [allQues, setAllQues] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [httpError, setHttpError] = useState();
    const [selectedStatus, setSelectedStatus] = useState(false);
    const [score, setScore] = useState(-1);

    // const [chosenAnswersCorrect, setChosenAnswersCorrect] = useState([]);
    console.log(answers);
    function checkAnswers() {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].answerChosen === allQues[i].answer) {
                score++;
            }
        }
        console.log('score: ', score);
        setScore(score);
        setSelectedStatus(true);
        // return score;
    }
    
    useEffect(() => {
        const fetchData = async () => {
            setAnswers([]);
            const response = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=base64");
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            const result = data.results.map(ques => {
                let { question, correct_answer, incorrect_answers } = ques;
                question = b64_to_utf8(question);
                correct_answer = b64_to_utf8(correct_answer);
                incorrect_answers = incorrect_answers.map(ans => b64_to_utf8(ans));
                const options = incorrect_answers.concat(correct_answer);
                const randomOptions = options.sort(() => Math.random() - 0.5);
                const answer = randomOptions.indexOf(correct_answer);
                const id = nanoid();
                return {
                    id,
                    question,
                    options,
                    answer,
                };
            });
            setAllQues(result);
        }
        fetchData().catch(err => {
            setHttpError(err.message);
        });
        // console.log(httpError);
    }, []);
    console.log(allQues);

    return (
        <div className="quiz">
            {
                allQues.map(ques => {
                    return <Question 
                        key={ques.id}
                        id={ques.id}
                        question={ques.question}
                        answer={ques.answer}
                        options={ques.options}
                        handleCallback={handleCallback}
                        answers={answers}
                        selectedStatus={selectedStatus}
                    />
                })
            }
            <div className="footer">
                {score === -1 ? null : <p className="score">You scored {score}/{allQues.length} correct answers</p>}
                <button 
                    className={`check-ans ${score === -1 ? "" : "play-again"}`}
                    onClick={() => {
                        // console.log(answers);
                        checkAnswers();
                    }}
                >
                    {
                        score === -1 ? "Check Answers" : "Play again"
                    }
                </button>
            </div>
        </div>
    );
};

export default Quiz;