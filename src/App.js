import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddRemoveStudent from "./components/AddRemoveStudent";
import UploadMarks from "./components/UploadMarks";
import MarksView from "./components/MarksView";

function App() {
  return <Router> 
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/add-removeStudent" element={<AddRemoveStudent/>}/>     
      <Route path="/upload" element={<UploadMarks/>}/>     
      <Route path="/marksview" element={<MarksView/>}/>
    </Routes>
  </Router>
}

export default App;
 