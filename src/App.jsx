// file imports
import Test from "./Test";
import Home from "./pages/Home";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import AddProduct from "./pages/addProduct/AddProduct";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

// dependency imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductTable from "./components/productTable/ProductTable";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product-table" element={<ProductTable />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
          <Route path="/*" element={<>Not Found</>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
