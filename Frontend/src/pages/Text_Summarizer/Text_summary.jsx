import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TextSummary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const input_text = queryParams.get("text");

  const [summary, setSummary] = useState("");
  const [bulletPoints, setBulletPoints] = useState([]);
  const [loading, setLoading] = useState(true);
   const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/api/text", { input_text })
      .then((res) => {
        const result = res.data.message.summary[0];
        console.log(result)
        setSummary(result.summarize);
        setBulletPoints(result.bullet_points);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching text summary:", err);
        setLoading(false);
      });
  }, [input_text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Summarized Text</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-pink-500 mb-2">Summary:</h3>
                <div className="bg-gray-100 p-4 rounded-lg relative">
                  <p className="text-gray-700 text-lg leading-relaxed">{summary}</p>
                  <button 
                    onClick={handleCopy} 
                    className="absolute bottom-2 right-2 bg-pink-500 hover:bg-pink-600 cursor-pointer text-white px-3 py-1 rounded-md text-sm"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Key Points:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 bg-gray-50 p-4 rounded-lg">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      </>
  );
};

export default TextSummary;
