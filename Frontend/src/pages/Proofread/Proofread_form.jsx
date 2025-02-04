import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";


const Proofread_form = () => {
    const [text, setText] = useState("");
  return (
    <>
     <Navbar />
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          Proof Read
        </h2>
        <form className="max-w-xl mx-auto mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <label
              htmlFor="text"
              className="block text-gray-700 text-base font-medium"
            >
              Enter Text:
            </label>
            <textarea
              id="text"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-3 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
              placeholder="Enter Text ..."
              required
            />
          </div>

          <div className="text-center">
            <Link to={`/proofread-gen?text=${text}`}>
              <button
                type="submit"
                className="px-6 py-3 bg-pink-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-pink-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                Proof Read
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Proofread_form