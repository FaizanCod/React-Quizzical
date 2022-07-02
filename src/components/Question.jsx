import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

function Question(props) {
    // console.log(props);
    const {question, id, answer, options, handleCallback, answers, selectedStatus} = props;
    // function b64_to_utf8( str ) {
    //     return decodeURIComponent(escape(window.atob( str )));
    // }

    // const [answers, setAnswers] = useState(dataAnswers());
    const [isAnswered, setIsAnswered] = useState({});
    // const [isCorrect, setIsCorrect] = useState({isCorrect: false});

    function handleAnswer(index, id) {
        // let flag = false;
        // for (let i = 0; i < answers.length; i++) {
        //     flag = false;
        //     if (answers[i].quesId === id) {
        //         if (answers[i].isCorrect) {
        //             flag = true;
        //             break;
        //         }
        //     }
        // }

        setIsAnswered(prevAnswer => {   
            return {
                optionIndex: index,
                questionId: id,
                isAnswered: true,
                isCorrect: answer === index
            }
        });
        // setIsCorrect(prevAnswer => {
        //     return {
        //         ...prevAnswer,
        //         isCorrect: answer === index
        //     }
        // });
        
        // console.log('Final: ', answers);
        // console.log('isCorrect: ', isCorrect);
        // console.log('chosenAnswersCorrect: ', chosenAnswersCorrect);
    }

    useEffect(() => {

    }, [selectedStatus]);

    return (
        <div className="question">
            <h3 className="ques-title">{props.question}</h3>
            <div className="options">
                {
                    props.options.map((option, index) => {
                        return <div 
                            className={
                                `option 
                                ${isAnswered.isAnswered && isAnswered.optionIndex === index ? 
                                    "selected" : ""}
                                ${isAnswered.isAnswered && isAnswered.isCorrect && isAnswered.optionIndex === index && selectedStatus ?
                                    "correct" : ""}
                                ${isAnswered.isAnswered && !isAnswered.isCorrect && isAnswered.optionIndex === index && selectedStatus ?
                                    "incorrect": ""}
                                ${isAnswered.isAnswered && !isAnswered.isCorrect && isAnswered.optionIndex !== index && selectedStatus && index === answer ?
                                    "correct" : ""}
                                }
                                `
                            } 
                            key={index}
                            onClick={() => {
                                handleAnswer(index, props.id)
                                // returnAnswers()
                                handleCallback(index, id, answer === index)
                                // checkAnswer(answer === index, id)
                            }}
                        >
                            <label>{option}</label>
                        </div>
                    })
                }
            </div>
            <hr />
        </div>
    );
};

export default Question;