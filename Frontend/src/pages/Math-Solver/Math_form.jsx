import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

const Math_form = () => {
    const [question, setQuestion] = useState("");

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          Math Solver
        </h2>
        <form className="max-w-xl mx-auto mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <label
              htmlFor="text"
              className="block text-gray-700 text-base font-medium"
            >
              Enter Question:
            </label>
            <textarea
              id="text"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-3 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
              placeholder="Enter the question 2+2=? "
              required
            />
          </div>

          <div className="text-center">
            <Link to={`/math-gen?question=${question}`}>
              <button
                type="submit"
                className="px-6 py-3 bg-pink-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-pink-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                Solve
              </button>
            </Link>
          </div>
        </form>
      </div>
    
    </>
  )
}

export default Math_form