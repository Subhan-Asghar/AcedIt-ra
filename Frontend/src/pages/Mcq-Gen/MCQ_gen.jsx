import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const MCQ_gen = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const num = queryParams.get('num');
    const topic = queryParams.get('topic');
    const grade = queryParams.get('grade');

    const [questions, setQuestions] = useState([]);
    const [showAnswers, setShowAnswers] = useState({}); 

    useEffect(() => {
        const info = { num, topic, grade };

        axios.post("https://acedit-server.vercel.app/api/mcq", { info })
            .then((res) => {
                const result = res.data.message;
                setQuestions(result.questions);
            })
            .catch((err) => {
                console.error("Error fetching MCQs:", err);
            });
    }, [num, topic, grade]);

    const toggleAnswer = (index) => {
        setShowAnswers((prevState) => ({
            ...prevState,
            [index]: !prevState[index], 
        }));
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Generated MCQs</h2>
                <p className="text-gray-600 mt-2 text-center">
                    Here are your multiple-choice questions on <span className="text-pink-500">{topic}</span> for <span className="text-pink-500">Grade {grade}</span>.
                </p>

                <div className="mt-6 space-y-8 max-w-3xl mx-auto">
                    {questions.length > 0 ? (
                        questions.map((q, index) => (
                            <div key={index} className="text-gray-800 text-lg">
                                <p className="font-semibold mb-4">Q{index + 1}: <span>{q.question}</span></p>
                                <ol className="mt-2 space-y-2 pl-6">
                                    {q.options.map((option, i) => (
                                        <li key={i} className="text-gray-700">
                                            <span className="font-bold text-pink-500">{String.fromCharCode(97 + i)}.</span> {option}
                                        </li>
                                    ))}
                                </ol>

                                {/* Show Answer Button */}
                                <a 
                                    className=" pl-5 text-pink-500  cursor-pointer hover:underline"
                                    onClick={() => toggleAnswer(index)}
                                >
                                    {showAnswers[index] ? "Hide Answer" : "Show Answer"}
                                </a>
 
                                {/* Display Answer */}
                                {showAnswers[index] && (
                                    <p className="mt-3 font-semibold">
                                        <span className="text-pink-500">Answer:</span> <span>{q.answer}</span>
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center mt-6">No MCQs generated yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MCQ_gen;
