import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Error from "./pages/Error";
import Login from "./AuthPages/Login";
import Register from "./AuthPages/Register";
import OTPpage from "./AuthPages/OTPpage";
import Protected from "./components/Protected";
import Profile from "./pages/Profile";
import ForgotPassward from "./AuthPages/ForgotPassward";
import ResetPassword from "./AuthPages/ResetPassword";
//#f6cf3b fbca34 feca44 fec839
//#dfbe49 d7b45c
//050506 162628 050404 3c3c44 1c241c

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Protected Component={Profile} />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
        <Route path="/forgotpassward" element={<ForgotPassward />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyotp" element={<OTPpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
