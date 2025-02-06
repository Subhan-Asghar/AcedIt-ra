import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Yt_gen = () => {
   const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get("link");
    const num = queryParams.get("num");
  
    const [questions, setQuestions] = useState([]);
    const [showAnswers, setShowAnswers] = useState({});
       useEffect(() => {
        const info = { num, url };
        axios
          .post("http://127.0.0.1:5000/api/yt", { info })
          .then((res) => {
            const result = res.data.message;
            console.log(result)
            setQuestions(res.data.message.questions);
          })
          .catch((err) => {
            console.error("Error fetching yt :", err);
            
          });
      }, [url,num]);

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
          Generated Questions
        </h2>
        {/* Questions List */}
        <div className="mt-8 space-y-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <div key={index} className="text-gray-800 text-lg border-b pb-4">
                {/* Question */}
                <p className="font-semibold mb-3">
                  <span className="text-pink-500">Q{index + 1}:</span> {q.question}
                </p>

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
            <p className="text-gray-500 text-center mt-6">No Questions generated yet.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Yt_gen