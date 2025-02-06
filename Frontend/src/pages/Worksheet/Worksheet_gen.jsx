import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Worksheet_gen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const num = queryParams.get("num");
  const topic = queryParams.get("topic");
  const grade = queryParams.get("grade");
  const [loading, setLoading] = useState(true);
  const [mcq_questions, setMcqQuestions] = useState([]);
  const [fill_in, setFillIn] = useState([]);
  const [test_q, setTestQ] = useState([]);

  useEffect(() => {
    const info = { num, topic, grade };

    axios
      .post("http://127.0.0.1:5000/api/worksheet", { info })
      .then((res) => {
        const result = res.data.message.worksheet;
        setFillIn(result.fill_in_the_blanks);
        setMcqQuestions(result.mcq_questions);
        setTestQ(result.test_questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Worksheet:", err);
        setLoading(false);
      });
  }, [num, topic, grade]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          Generated Worksheet
        </h2>
        <p className="text-gray-600 mt-3 text-center">
          Here is your worksheet on <span className="text-pink-500 font-medium">{topic}</span> for {" "}
          <span className="text-pink-500 font-medium">
            {grade === "undergraduate"
              ? "Undergraduate Level"
              : grade === "graduate"
              ? "Graduate Level"
              : `Grade ${grade}`}
          </span>.
        </p>
        {loading? (
         <p className="text-center text-gray-500">Loading...</p>
      ):<>
      <div className="mt-8 space-y-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {/* MCQ Questions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Multiple Choice Questions</h2>
            {mcq_questions.length > 0 ? (
              mcq_questions.map((q, index) => (
                <div key={index} className="text-gray-800 text-lg border-b pb-4 mb-5">
                  <p className="font-semibold mb-3">
                    <span className="text-pink-500">Q{index + 1}:</span> {q.question}
                  </p>
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
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-6">No MCQs available.</p>
            )}
          </div>

          {/* Fill in the Blanks */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-600">Fill in the Blanks</h2>
            {fill_in.length > 0 ? (
              fill_in.map((q, index) => (
                <p key={index} className=" text-lg text-gray-800 mb-5">
                  <span className="text-pink-500">{index + 1}.</span> {q.question} 
                </p>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-6">No fill-in-the-blank questions available.</p>
            )}
          </div>

          {/* Test Questions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-red-600">Short Answer Questions</h2>
            {test_q.length > 0 ? (
              test_q.map((q, index) => (
                <div key={index} className="text-gray-800 text-lg border-b pb-4 mb-3">
                  <p className="font-semibold mb-3">
                    <span className="text-pink-500">Q{index + 1}:</span> {q.question}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-6">No test questions available.</p>
            )}
          </div>
        </div>
      </>}

        
      </div>
    </>
  );
};

export default Worksheet_gen;