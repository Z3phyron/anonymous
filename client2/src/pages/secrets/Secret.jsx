import React from "react";
import styled from "styled-components";
import moment from "moment"

const Secret = ({secret}) => {
  return (
    <Cont>
      <p>{secret?.secret}</p>
      <small className="time">{moment(secret?.createdAt).fromNow()}</small>
    </Cont>
  );
};

const Cont = styled.div`
  /* From https://css.glass */
  color: var(--white);
  padding: 10px;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 100;
  line-height: 140%;
  text-align: left;
  border-radius: 8px;
  border-radius: 10px;
  outline: none;
  border: none;
  color: var(--white);
  background: #000;

  p {
    margin-bottom: 20px;
  }

  .time {
    font-size: 10px;
    color: #b8b8b8;
  }
`;

export default Secret;
