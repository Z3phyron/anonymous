import styled from "styled-components";
import { useClipboard } from "use-clipboard-copy";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { IoCopyOutline } from "react-icons/io5";
import { reset, SignOut } from "../../features/auth/authSlice";

const Home = (props) => {
  const clipboard = useClipboard();

  const { user, isLoading } = useSelector((state) => state.auth);
  console.log(user);

  let url = `https://anonymous-omega.vercel.app/${user?.user?.userName}`;

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(SignOut());
    dispatch(reset());
  };

  return (
    <Cont>
      <Wrap>
        <button className="signout" onClick={signOut}>
          SignOut
        </button>
        <Header>
          <h2 className="user">{user?.user?.userName}'s Profile</h2>
          <div className="userLink">
            <input ref={clipboard.target} value={url} readOnly />
            <button onClick={clipboard.copy}>
              <IoCopyOutline />
            </button>
          </div>
        </Header>
        <Cta to="/confessions">View Messages</Cta>
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
  position: relative;
  padding: 50px 30px;

  .signout {
    position: absolute;
    right: 10px;
    top: 10px;
    opacity: 0.4;
    transition: 1s;
    &:hover {
      opacity: 1;
    }
    padding: 10px 20px;
    border-radius: 10px;
    outline: none;
    border: none;
    color: var(--white);
    background: #000;
  }
`;

const Header = styled.div`
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
  margin-bottom: 30px;

  .user {
    font-size: 40px;
    text-transform: capitalize;
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

export default Home;
