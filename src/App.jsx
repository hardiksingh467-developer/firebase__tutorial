// file imports
import Test from "./Test";
import Home from "./pages/Home";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

// dependency imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<>Not Found</>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
