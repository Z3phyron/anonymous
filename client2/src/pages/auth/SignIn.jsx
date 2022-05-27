import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import FormikControl from "../../utils/formik/FormikControl";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--black);
`;

const SignIn = () => {
  let [color, setColor] = useState("#000");
  const initialValues = {
    userName: "",
    password: "",
  };

  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);
  console.log(user);

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    dispatch(signIn(values));
  };

  if (user?.token) {
    return <Navigate to="/" />;
  }

  return (
    <Cont>
      <Wrap>
        <Text>
          <div className="header">
            <h3>Sign In</h3>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    label="User Name"
                    name="userName"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Password"
                    name="password"
                  />
                  <Button type="submit" disabled={!formik.isValid}>
                    {isLoading ? (
                      <PulseLoader
                        color={color}
                        loading={true}
                        css={override}
                        size={10}
                      />
                    ) : (
                      <>Submit</>
                    )}
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <p>
            <Link to="/forgotPassword">Forgot Password? </Link>
          </p>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Text>
      </Wrap>
    </Cont>
  );
};

const Cont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 5%;
`;
const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  width: 50%;
  margin: auto;
  /* From https://css.glass */
  background: rgba(20, 20, 20, 0.577);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(64, 64, 64, 0.192);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  @media (max-width: 700px) {
    width: 100%;
  }
  padding: 30px;
`;

const Text = styled.div`
  width: 100%;

  .header {
    font-size: 30px;
    color: #fff;
    margin-bottom: 20px;
  }
  p {
    margin-top: 10px;
    color: #fff;
    a:visited {
      color: var(--blue);
    }
  }
`;
const Button = styled.button`
  outline: none;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  background: var(--green);
  color: var(--black);
`;

export default SignIn;
