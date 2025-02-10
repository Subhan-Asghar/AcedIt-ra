import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Math_gen = () => {
    const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const input_text = queryParams.get("question")
      const [loading, setLoading] = useState(true);
      const [questions, setQuestions] = useState([]);
      useEffect(() => {
        axios
          .post("http://127.0.0.1:5000/api/math", { input_text })
          .then((res) => {
            const result=res.data.message;
            console.log(result)
            // setQuestions(res.data.message.questions);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching MCQs:", err);
            setLoading(false);
          });
      }, [input_text]);
  return (
    <>
     <Navbar />
    </>
  )
}

export default Math_gen