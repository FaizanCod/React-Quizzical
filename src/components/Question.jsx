import React, { useEffect, useState } from "react";

function Question(props) {
    // console.log(props);
    const {question, id, answer, options, handleCallback, answers, selectedStatus} = props;
    const [isAnswered, setIsAnswered] = useState({});

    function handleAnswer(index, id) {

        setIsAnswered(prevAnswer => {   
            return {
                optionIndex: index,
                questionId: id,
                isAnswered: true,
                isCorrect: answer === index
            }
        });
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
                                ${!isAnswered.isCorrect && isAnswered.optionIndex !== index && selectedStatus && index === answer ?
                                    "correct" : ""}
                                }
                                `
                            } 
                            key={index}
                            onClick={() => {
                                handleAnswer(index, props.id)
                                handleCallback(index, id, answer === index)
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