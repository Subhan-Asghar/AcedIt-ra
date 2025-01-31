import React from "react";
import Navbar from "../Components/Navbar";
import tools from "../data/tools.json";
import { Book, Video, FileText } from "lucide-react"; 
import { Link } from "react-router-dom";

const iconMap = {
  "book": <Book size={25} className="text-white" />,
  "video": <Video size={25} className="text-white" />,
  "file-text": <FileText size={25} className="text-white" />
};

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Explore the Tools</h2>
        <p className="text-gray-600 mt-2">
          Discover powerful tools designed to enhance productivity and creativity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {tools.map((tool) => (
            <div key={tool.id}>
            <Link 
            to={`/${tool.path}`} 
            className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-500 flex items-center justify-center rounded-md">
                {iconMap[tool.icon]}
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">{tool.name}</h3>
                <p className="text-gray-700 mt-1">{tool.description}</p>
              </div>
             
            </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
