import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useJwt } from "react-jwt";

const ProtectedRoutes = ({ props: any }) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const token = user?.token;
  const { decodedToken, isExpired } = useJwt(token);

  //   console.log(user);

  // console.log(isExpired)

  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("USER");
    }
  }, []);

  if (!user) {
    return <Navigate to="/signup" />;
  }

  return (
    <Page>
      <Outlet />
    </Page>
  );
};

const Page = styled.div`
  @media screen and (max-width: 900px) {
    padding-left: 0;
  }
`;

export default ProtectedRoutes;
