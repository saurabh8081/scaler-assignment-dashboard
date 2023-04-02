import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddStudent from "./components/AddStudent";
import UploadMarks from "./components/UploadMarks";
import Status from "./components/Status";
import Marksheet from "./components/Marksheet";

function App() {
  return <Router> 
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/addStudent" element={<AddStudent/>}/>     
      <Route path="/upload" element={<UploadMarks/>}/>     
      <Route path="/status" element={<Status/>}/>
      <Route path="/marksheet" element={<Marksheet/>}/>
    </Routes>
  </Router>
}

export default App;
 