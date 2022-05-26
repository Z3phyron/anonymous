import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import VerifyMail from "./pages/auth/VerifyMail";
import Home from "./pages/home/Home";
import AddSecrets from "./pages/secrets/AddSecrets";
import Secrets from "./pages/secrets/Secrets";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
        <Route path="/reset/:token/password" exact element={<ResetPassword />} />
        <Route path="/mail/:id/verify/:token" exact element={<VerifyMail />} />

        <Route path="/:userId" exact element={<AddSecrets />} />
        <Route path="/" exact element={<ProtectedRoutes />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/confessions" exact element={<Secrets />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
