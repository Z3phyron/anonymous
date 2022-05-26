import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
`;

const API_URL = "http://localhost:5000/api/auth/";

const VerifyMail = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const param = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const id = param.id;
        const token = param.token;
        const url = `${API_URL}${id}/verify/${token}`;
        const { data } = await axios.put(url);
        console.log(data);
        //check to see if success,,,,,,,,, then set validurl to true

        setTimeout(() => {
          setIsVerified(true);
          setLoading(false);
        }, 3000);

        if (isVerified === true) {
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (error) {
        console.log(error);
        setIsVerified(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {" "}
      {loading ? (
        <Cont>
          <Wrap>
            <PulseLoader
              color={color}
              loading={true}
              css={override}
              size={60}
            />
          </Wrap>
        </Cont>
      ) : (
        <>
          {isSuccess ? (
            <Cont>
              <Wrap>
                <div className="success">Email Verified Successfully!</div>
              </Wrap>
            </Cont>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

const Cont = styled.div`
  /* p  */
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Wrap = styled.div`
  /* p  */
  text-align: center;
  width: 100%;
  margin: auto;

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
// const Form = styled.form`
//   /* p  */
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-gap: 20px;

//   button {
//     width: 100%;
//     padding: 20px 10px;
//     border-radius: 8px;
//     outline: none;
//     border: none;
//   }
// // `;
// const FormControl = styled.div`
//   /* p  */
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-gap: 20px;
// `;
// const InputField = styled.div`
//   /* p  */
//   width: 100%;
// `;
// const Input = styled.input`
//   /* p  */
//   width: 100%;
//   padding: 20px 10px;
//   border-radius: 8px;
//   outline: none;
//   border: none;
//   background: rgba(0, 0, 0, 0.05);
// `;

export default VerifyMail;
