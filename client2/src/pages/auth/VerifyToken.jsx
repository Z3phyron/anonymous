import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  verifyToken,
  resetPassword,
  reset,
} from "../../features/auth/authSlice";

const VerifyToken = () => {
  console.log(
    useLocation().search.slice(0, useLocation().search.length).split("=").pop()
  );

  const token = useLocation()
    .search.slice(0, useLocation().search.length)
    .split("=")
    .pop();

  const { email, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (token) {
      dispatch(verifyToken(token));
    }

    if (isSuccess) {
      navigate("/reset-password");
    }

    // dispatch(reset());
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Cont>
      <Wrap>
        <header>
          <h3 className="heading">Reset password</h3>
          <p className="desc">Create a ne password</p>
        </header>
      </Wrap>
    </Cont>
  );
};

const Cont = styled.div`
  /* p  */
  padding: 15vh 5% 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  /* p  */
  width: 50%;
  margin: auto;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.18);
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);
  padding: 50px;
  border-radius: 20px;
  padding: 50px;
  border-radius: 20px;

  @media (max-width: 900px) {
    width: 100%;
    padding: 20px;
  }

  header {
    margin-bottom: 20px;
    .heading {
      margin-bottom: 10px;
      font-size: 30px;
    }
  }
`;
const Form = styled.form`
  /* p  */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;

  button {
    width: 100%;
    padding: 20px 10px;
    border-radius: 8px;
    outline: none;
    border: none;
  }
`;
const FormControl = styled.div`
  /* p  */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
`;
const InputField = styled.div`
  /* p  */
  width: 100%;
  position: relative;

  .show {
    position: absolute;
    right: 20px;
    bottom: 13px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
    border-radius: 50px;

    &:hover {
      background: #f2f2f2;
    }
  }
`;

export default VerifyToken;
