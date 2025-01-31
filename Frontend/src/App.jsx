import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import MCQ from "./pages/Mcq-Gen/MCQ_from"
import MCQ_gen from "./pages/Mcq-Gen/MCQ_gen"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/mcqform" element={<MCQ/>} />
      <Route path="/mcqgen" element={<MCQ_gen/>} />

    </Routes>
     
    </>
  )
}

export default App
