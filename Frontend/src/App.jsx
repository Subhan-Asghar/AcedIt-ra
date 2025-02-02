import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import MCQ from "./pages/Mcq-Gen/MCQ_from"
import MCQ_gen from "./pages/Mcq-Gen/MCQ_gen"
import Text_form from "./pages/Text_Summarizer/Text_form"
import Text_summary from "./pages/Text_Summarizer/Text_summary"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/mcqform" element={<MCQ/>} />
      <Route path="/mcqgen" element={<MCQ_gen/>} />
      <Route path="/textsummary" element={<Text_form/>} />
      <Route path="/textsummarygen" element={<Text_summary/>} />

    </Routes>
     
    </>
  )
}

export default App
