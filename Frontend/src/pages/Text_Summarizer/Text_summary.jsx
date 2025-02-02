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

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Text Summary</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading summary...</p>
          ) : (
            <>
              <p className="text-gray-700 text-lg mb-4">
                <span className="font-semibold text-pink-500">Summary:</span> {summary}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Key Points:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TextSummary;
