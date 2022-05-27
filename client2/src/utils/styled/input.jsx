import styled from "styled-components"



export const Media = styled.div`
position: relative;
width: 100px;
height: 48px;
display: flex;
justify-content: center;
align-items: center;
background: var(--green);
border-radius: 5px;

&:hover {
box-shadow: 0px 1px 1px var(--green);
}

.icon {
    position: absolute;
    color: var(--white);
    font-size: 38px;
    z-index: 1;
}

  input[type="file"] {
opacity: 0;
height: 100%;
z-index: 55;
  }
`;

export const InputField = styled.div`
  position: relative;
  height: 48px;
  margin-bottom: 1.5rem;
  width: 100%;

  .form__label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: 0 0.25rem;
    background-color: rgba(255, 255, 255, 0);
    color: #fff;
    font-size: var(--normal-font-size);
    transition: 0.3s;
  }

  .form__error {
    color: rgba(19, 19, 19, 0.962);
    .error {
      color: rgba(19, 19, 19, 0.962);
    }
  }

  .form__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: var(--normal-font-size);
    border: 1px solid var(--green);
    border-radius: 0.5rem;
    outline: none;
    color: #fff;
    padding: 1rem;
    background: none;
    z-index: 1;
  }

  .form__input:focus + .form__label {
    top: -0.5rem;
    left: 0.8rem;
    color: #fff;
    background: rgba(19, 19, 19, 0.962);
    font-size: var(--small-font-size);
    font-weight: 500;
    z-index: 10;
  }

  .form__input:not(:placeholder-shown).form__input:not(:focus) + .form__label {
    top: -0.5rem;
    left: 0.8rem;
    font-size: var(--small-font-size);
    font-weight: 500;
    z-index: 10;
  }

  /*Input focus*/
  .form__input:focus {
    border: 1.5px solid var(--green);
  }
`;

export const TextAreaField = styled.div`
  position: relative;
  height: 30vh;
  margin-bottom: 1.5rem;
  width: 100%;

  .form__label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: 0 0.25rem;
    background-color: rgba(255, 255, 255, 0);
    color: #fff;
    font-size: var(--normal-font-size);
    transition: 0.3s;
  }

  .form__error {
    color: rgba(19, 19, 19, 0.962);
    .error {
      color: rgba(19, 19, 19, 0.962);
    }
  }

  .form__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: var(--normal-font-size);
    border: 1px solid var(--green);
    border-radius: 0.5rem;
    outline: none;
    padding: 1rem;
    background: none;
    color: #fff;
    z-index: 1;
  }

  .form__input:focus + .form__label {
    top: -0.5rem;
    left: 0.8rem;
    color: #fff;
    background: rgba(19, 19, 19, 0.962);
    font-size: var(--small-font-size);
    font-weight: 500;
    z-index: 10;
  }

  .form__input:not(:placeholder-shown).form__input:not(:focus) + .form__label {
    top: -0.5rem;
    left: 0.8rem;
    font-size: var(--small-font-size);
    font-weight: 500;
    z-index: 10;
  }

  /*Input focus*/
  .form__input:focus {
    border: 1.5px solid var(--green);
  }
`;


export const InputF = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: var(--normal-font-size);
  border: 1px solid var(--green);
  border-radius: 0.5rem;
  outline: none;
  padding: 1rem;
  background: none;
  z-index: 1;
`;
export const TextArea = styled.textarea`
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  font-size: var(--normal-font-size);
  border: 1px solid var(--green);
  border-radius: 0.5rem;
  outline: none;
  padding: 1rem;
  background: none;
  z-index: 1;
`;
export const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: 1rem;
  padding: 0 0.25rem;
  background-color: #fff;
  color: var(--input-color);
  font-size: var(--normal-font-size);
  transition: 0.3s;
`;
export const Error = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: 0 0.25rem;
  background-color: #fff;
  color: var(--input-color);
  font-size: var(--normal-font-size);
  transition: 0.3s;
  color: red;
`;


export const Button = styled.button`

`;