import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SecretList from "./SecretList";
import { getSecrets } from "../../features/secrets/secrettSlice";

const Secrets = (props) => {
  const [conf, setConf] = useState("");

  const dispatch = useDispatch();

  const { secrets, isLoading, isSuccess } = useSelector(
    (state) => state.secret
  );

  useEffect(() => {
    dispatch(getSecrets());
  }, []);

  return (
    <Cont>
      <Wrap>
        <Header>
          <h2 className="user">Confessions</h2>
          <p>
            👇 Scroll 👇 down to check out the confessions that you have
            received
          </p>
        </Header>
        {secrets ? (
          <Box>
            <SecretList secrets={secrets} />
          </Box>
        ) : (
          <Box>
            <NoSecret>
              <p>
                Ouch! 😅 No one has sent you a message
                <br /> Share your profile link and check back later again!
              </p>
            </NoSecret>
          </Box>
        )}

        <Cta to="/">Go Back</Cta>
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
  //
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

export default Secrets;
