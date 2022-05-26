import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../utils/formik/FormikControl";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../features/auth/authSlice";
import { css } from "@emotion/react";
import { BsCheck2Circle } from "react-icons/bs";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
`;

const ForgotPassword = () => {
  let [color, setColor] = useState("#000");
  const initialValues = {
    email: "",
  };

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    dispatch(forgotPassword(values));
  };
  return (
    <>
      {isSuccess ? (
        <Cont>
          <div className="wrap">
            <div className="icon">
              <BsCheck2Circle />
            </div>
            <div className="message">
              Please check your email for instructions on how to recorver your
              password.
            </div>
          </div>
        </Cont>
      ) : (
        <Cont>
          <Wrap>
            <Text>
              <div className="header">
                <h3>forgot Password</h3>
                <p>
                  Please enter the e-mail address associated with your Note
                  account. We will send you a link to this e-mail address to
                  reset your password.
                </p>
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
      )}
    </>
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

export default ForgotPassword;
