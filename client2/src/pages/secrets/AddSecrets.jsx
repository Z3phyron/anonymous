import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../utils/formik/FormikControl";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { createSecret } from "../../features/secrets/secrettSlice";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--black);
`;

const AddSecrets = (props) => {
  const [userName, setUserName] = useState("");
    let [color, setColor] = useState("#000");
    const initialValues = {
      secret: "",
    
    };

  const params = useParams()
  const dispatch = useDispatch();
  
    useEffect(() => {
      const userId = params.userId
      setUserName(userId)
      console.log(userName)
    }, []);

    const { isLoading } = useSelector((state) => state.secret);
    // console.log(user);

    const validationSchema = Yup.object({
      secret: Yup.string().required("Required"),
    });

    const onSubmit = (values) => {
      console.log("Form data", values);
      dispatch(createSecret({values, userName}));
    };


  



  return (
    <Cont>
      <Wrap>
        <Header>
          <h2 className="user">Confess</h2>
          <p>confess to user</p>
        </Header>

        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="textarea"
                    type="tet"
                    label="Say Something About Me"
                    name="secret"
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
        </Box>

        <Cta to="/confessions">Go Back</Cta>
      </Wrap>
    </Cont>
  );
};

const Cont = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 5%;
`;
const Box = styled.div`
  margin-bottom: 30px;
`;
const NoSecret = styled.div`
  /* From https://css.glass */
  background: rgb(0, 0, 0);
  border-radius: 10px;
  color: var(--white);
  padding: 10px;
  font-size: 15px;
  font-weight: 100;
  line-height: 140%;
  text-align: left;
  border-radius: 8px;
  border-radius: 10px;
  text-align: center;
  margin: 20px;
  letter-spacing: 2px;
  padding: 30px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.42);
`;

const Wrap = styled.div`
  align-items: center;
  text-align: center;
  width: 75%;
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
  padding: 50px 30px;
`;

const Header = styled.div`
  text-align: center;
  color: #fff;
  margin-bottom: 30px;

  .user {
    font-size: 40px;
    margin-bottom: 30px;
  }

  .userLink {
    margin-bottom: 20px;
    width: 250px;
    margin: auto;
    position: relative;
    overflow: hidden;
    border-radius: 10px;

    input {
      width: 100%;
      padding: 10px 20px;
      border-radius: 10px;
      outline: none;
      border: none;
      color: var(--white);
      background: #000;
      /* font-size: 18px; */
    }

    button {
      position: absolute;
      width: 30px;
      height: 35px;
      outline: none;
      border: none;
      color: var(--white);
      background: #000;
      right: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;

      &:hover {
        background: rgba(86, 86, 86, 0.57);
      }
    }
  }
`;
const Cta = styled(Link)`
  margin-top: 20px;
  color: var(--black);

  padding: 10px 30px;
  border-radius: 50px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.476);

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: 1s;

  &:hover {
    color: var(--black);
    background: rgb(255, 255, 255);
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


export default AddSecrets;
