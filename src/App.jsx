import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Test";
import Home from "./pages/Home";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<>Not Found</>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
