import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import MCQ from "./pages/Mcq-Gen/MCQ_from"
import MCQ_gen from "./pages/Mcq-Gen/MCQ_gen"
import Text_form from "./pages/Text_Summarizer/Text_form"
import Text_summary from "./pages/Text_Summarizer/Text_summary"
import Test_form from "./pages/Test_Question/Test_form"
import Test_gen from "./pages/Test_Question/Test_gen"
import Worksheet_form from "./pages/Worksheet/Worksheet_form"
import Worksheet_gen from "./pages/Worksheet/Worksheet_gen"
import Proofread_form from "./pages/Proofread/Proofread_form"
import Proofread_gen from "./pages/Proofread/Proofread_gen"
import Yt_form from "./pages/Yt-Questions/Yt_form"
import Yt_gen from "./pages/Yt-Questions/Yt_gen"
import Math_form from "./pages/Math-Solver/Math_form"
import Math_gen from "./pages/Math-Solver/Math_gen"

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
      <Route path="/proofread" element={<Proofread_form/>} />
      <Route path="/proofread-gen" element={<Proofread_gen/>} />
      <Route path="/yt" element={<Yt_form/>} />
      <Route path="/yt-gen" element={<Yt_gen/>} />
      <Route path="/math" element={<Math_form/>} />
      <Route path="/math-gen" element={<Math_gen/>} />
      

    </Routes>
     
    </>
  )
}

export default App
