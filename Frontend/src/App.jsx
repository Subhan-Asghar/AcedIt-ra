import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import MCQ from "./pages/Mcq-Gen/MCQ_from"
import MCQ_gen from "./pages/Mcq-Gen/MCQ_gen"
import Text_form from "./pages/Text_Summarizer/Text_form"
import Text_summary from "./pages/Text_Summarizer/Text_summary"
import Test_form from "./pages/Test_Question/Test_form"
import Test_gen from "./pages/Test_Question/Test_gen"
import Worksheet_form from "./pages/Worksheet/worksheet_form"
import Worksheet_gen from "./pages/Worksheet/worksheet_gen"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/mcq-form" element={<MCQ/>} />
      <Route path="/mcq-gen" element={<MCQ_gen/>} />
      <Route path="/text-summary" element={<Text_form/>} />
      <Route path="/text-summary-gen" element={<Text_summary/>} />
      <Route path="/test-question" element={<Test_form/>} />
      <Route path="/test-question-gen" element={<Test_gen/>} />
      <Route path="/worksheet" element={<Worksheet_form/>} />
      <Route path="/worksheet-gen" element={<Worksheet_gen/>} />

    </Routes>
     
    </>
  )
}

export default App
