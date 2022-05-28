import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import AddSecrets from "./pages/secrets/AddSecrets";
import Secrets from "./pages/secrets/Secrets";
import ProtectedRoutes from "./ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
        <Route
          path="/reset/:token/password"
          exact
          element={<ResetPassword />}
        />

        <Route path="/:userId" exact element={<AddSecrets />} />
        <Route path="/" exact element={<ProtectedRoutes />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/:userId" exact element={<AddSecrets />} />
          <Route path="/confessions" exact element={<Secrets />} />
        </Route>
      </Routes>
      <footer>
        developed by <a href="https://github.com/Z3phyron">Z3phyron</a>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        theme="dark"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
