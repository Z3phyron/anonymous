import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../utils/formik/FormikControl";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import {
  verifyToken,
  resetPassword,

} from "../../features/auth/authSlice";
import { css } from "@emotion/react";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
`;

const ResetPassword = () => {
  let [color, setColor] = useState("#000");
  let [mail, setMail] = useState("");
    const { user, email, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    const token = param.token;
    if (token) {
      dispatch(verifyToken(token));
      setMail(email)
    }

   
  }, []);



  const initialValues = {
     email,
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const validationSchema = Yup.object({

    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
  
    console.log("Form data", values);
    dispatch(resetPassword(values));
    if (isSuccess) {
      return <Navigate to="/signin" />;
    }
  };

  if (user?.msg === "Reset Successful") {
    return <Navigate to="/signin" />;
  }

  return (
    <Cont>
      <Wrap>
        <Text>
          <div className="header">
            <h3>Reset Password</h3>
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
                    type="email"
                    label="Email"
                    name="email"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Password"
                    name="password"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
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

  color: #fff;

  .wrap {
    text-align: center;
  }

  .icon {
    font-size: 60px;
    margin-bottom: 20px;
  }

  .message {
    font-size: 20px;
  }
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
    font-size: 13px;
    line-height: 130%;
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

export default ResetPassword;
