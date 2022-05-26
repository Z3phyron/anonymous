import React from 'react'
import styled from "styled-components"
import Secret from './Secret';


const SecretList = ({secrets}) => {
  return (
    <Cont>
      {secrets && secrets.map(secret => (
        <Secret key={secret._id} secret={ secret}/>
      )) }
          
          
    </Cont>
  )
}


const Cont = styled.nav`
display: grid;
grid-gap: 20px;
`;

export default SecretList