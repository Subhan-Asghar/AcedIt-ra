import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MCQ_gen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const num = queryParams.get("num");
  const topic = queryParams.get("topic");
  const grade = queryParams.get("grade");
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    const info = { num, topic, grade };

    axios
      .post("http://127.0.0.1:5000/api/mcq", { info })
      //https://acedit-server.vercel.app/
      //http://127.0.0.1:5000
      .then((res) => {
        setQuestions(res.data.message.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching MCQs:", err);
        setLoading(false);
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
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          Generated MCQs
        </h2>
        <p className="text-gray-600 mt-3 text-center">
          Here are your multiple-choice questions on{" "}
          <span className="text-pink-500 font-medium">{topic}</span> for{" "}
          <span className="text-pink-500 font-medium">
            {grade === "undergraduate"
              ? "Undergraduate Level"
              : grade === "graduate"
              ? "Graduate Level"
              : `Grade ${grade}`}
          </span>
          .
        </p>

        {loading? (
         <p className="text-center text-gray-500">Loading...</p>
      ):<>
      
        {/* MCQ List */}
        <div className="mt-8 space-y-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <div key={index} className="text-gray-800 text-lg border-b pb-4">
                {/* Question */}
                <p className="font-semibold mb-3">
                  <span className="text-pink-500">Q{index + 1}:</span> {q.question}
                </p>

                {/* Options */}
                <ol className="space-y-2 pl-6">
                  {q.options.map((option, i) => (
                    <li key={i} className="text-gray-700 flex items-center">
                      <span className="font-bold text-pink-500 mr-2">
                        {String.fromCharCode(97 + i)}.
                      </span>{" "}
                      {option}
                    </li>
                  ))}
                </ol>

                {/* Show/Hide Answer Button */}
                <button
                  className="mt-3 text-pink-500 font-medium hover:underline transition cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  {showAnswers[index] ? "Hide Answer" : "Show Answer"}
                </button>

                {/* Answer Section */}
                {showAnswers[index] && (
                  <p className="mt-3 font-semibold text-gray-800 bg-gray-100 p-3 rounded-lg transition-all">
                    <span className="text-pink-500">Answer:</span> {q.answer}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-6">No MCQs generated yet.</p>
          )}
        </div>
      </>}
       
      </div>
    </>
  );
};

export default MCQ_gen;
