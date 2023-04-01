import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddRemoveStudent from "./components/AddRemoveStudent";

function App() {
  return <Router> 
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/add-removeStudent" element={<AddRemoveStudent/>}/>
    </Routes>
  </Router>
}

export default App;
 