import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Math_gen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const input_text = queryParams.get("question");

  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    if (!input_text) return; // Prevent unnecessary API calls

    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/api/math", { input_text })
      .then((res) => {
        const result=res.data.message.questions[0]
        console.log(result)
        setQuestionData(result);  
      })
      .catch((err) => {
        console.error("Error fetching MCQs:", err);
        setQuestionData(null);
      })
      .finally(() => setLoading(false));
  }, [location.search]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          Math Solver
        </h2>
        <p className="text-gray-600 mt-3 text-center">
          Here is the step-by-step solution to your question
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : questionData ? (
          <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="text-gray-800 text-lg border-b pb-4">
              <p className="font-semibold mb-3">
                <span className="text-pink-500">Question: </span>
                {questionData.question}
              </p>
              <div className="space-y-2 pl-6">
                {questionData.steps?.map((step, i) => (
                  <div key={i} className="text-gray-700 items-center">
                    <span className="font-bold text-pink-500 mr-2 ">
                      Step {i+1}:
                    </span>
                    <div>{step}</div>
                    <br />
                  </div>
                ))}
              </div>
              <p className="mt-3 font-semibold text-gray-800 bg-gray-100 p-3 rounded-lg transition-all">
                    <span className="text-pink-500">Answer:</span> {questionData.answer}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No data available.</p>
        )}
      </div>
    </>
  );
};

export default Math_gen;
