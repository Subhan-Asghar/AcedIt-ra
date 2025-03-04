import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

const Mcq = () => {
  const [topic, setTopic] = useState("");
  const [num, setNum] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          Create MCQs
        </h2>
        <form className="max-w-xl mx-auto mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg">
          {/* Topic Input */}
          <div>
            <label
              htmlFor="topic"
              className="block text-gray-700 text-base font-medium"
            >
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-3 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
              placeholder="Enter the topic..."
              required
            />
          </div>

          {/* Number of MCQs Input */}
          <div>
            <label
              htmlFor="num"
              className="block text-gray-700 text-base font-medium"
            >
              Number of MCQs (1 to 20)
            </label>
            <input
              type="number"
              id="num"
              value={num}
              onChange={(e) => setNum(Math.min(20, Math.max(1, e.target.value)))}
              className="mt-3 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
              placeholder="Enter number of questions"
              min="1"
              max="20"
              required
            />
          </div>

          {/* Grade Level Dropdown */}
          <div>
            <label
              htmlFor="grade"
              className="block text-gray-700 text-base font-medium"
            >
              Grade Level
            </label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-3 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
              required
            >
              <option value="">Select Grade</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="university">University</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Link to={`/mcq-gen?num=${num}&topic=${topic}&grade=${grade}`}>
              <button
                type="submit"
                className="px-6 py-3 bg-pink-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-pink-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                Generate MCQs
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Mcq;
