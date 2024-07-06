import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./page";
import Auth from "./page/auth/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/index/:token"  element={<Index/>}/>
      </Routes>
    </Router>
  );
}

export default App;