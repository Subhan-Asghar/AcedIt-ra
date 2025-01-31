import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const MCQ_gen = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const num = queryParams.get('num');
    const topic = queryParams.get('topic');
    const grade = queryParams.get('grade');

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const info = { num, topic, grade };

        axios.post("http://localhost:5000/api/mcq", { info })
            .then((res) => {
                const result = res.data.message;
                setQuestions(result.questions || []);
            })
            .catch((err) => {
                console.error("Error fetching MCQs:", err);
            });
    }, [num, topic, grade]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-6 text-center">
                <h2 className="text-3xl font-bold text-white">Generated MCQs</h2>
                <p className="text-gray-400 mt-2">
                    Here are your generated multiple-choice questions on <span className="text-blue-400">{topic}</span> for <span className="text-blue-400">Grade {grade}</span>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {questions.length > 0 ? (
                        questions.map((q, index) => (
                            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
                                <h3 className="text-lg font-semibold text-blue-400">Q{index + 1}: {q.question}</h3>
                                <ul className="mt-3 space-y-2">
                                    {q.options.map((option, i) => (
                                        <li key={i} className="bg-gray-800 p-3 rounded-md text-white hover:bg-blue-500 transition">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4 text-sm text-gray-400">
                                    <span className="font-bold text-green-400">Answer:</span> {q.answer}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-6">No MCQs generated yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MCQ_gen;
