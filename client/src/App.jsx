import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { getUser } from "./store/slices/authSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from "./store/slices/borrowSlice";
import { fetchAllUsers } from "./store/slices/userSlice";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchAllBooks());
    if(isAuthenticated && user?.role === "User"){
      dispatch(fetchUserBorrowedBooks());
    }
    if(isAuthenticated && user?.role === "Admin"){
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
  }, [isAuthenticated]);

  return <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/otp-verification/:email" element={<OTP />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
    </Routes>

    <ToastContainer theme="dark" />
  </Router>;
};

export default App;
