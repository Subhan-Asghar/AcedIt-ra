import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';
const Mcq = () => {
  const [topic, setTopic] = useState('');
  const [num, setnum] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({ topic, num, grade });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Create MCQs</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6 space-y-6">
          <div>
            <label htmlFor="topic" className="block text-gray-700 text-sm font-medium">Topic</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full"
              placeholder="Enter the topic"
              required
            />
          </div>

          <div>
            <label htmlFor="num" className="block text-gray-700 text-sm font-medium">Number of MCQs (1 to 20)</label>
            <input
              type="number"
              id="num"
              value={num}
              onChange={(e) => setnum(Math.min(20, Math.max(1, e.target.value)))}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full"
              placeholder="Enter number of questions"
              min="1"
              max="20"
              required
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-gray-700 text-sm font-medium">Grade Level</label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full"
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

          <div className="text-center">
            <Link to={`/mcqgen?num=${num}&topic=${topic}&grade=${grade}`}>
            <button
              type="submit"
              className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition cursor-pointer"
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
