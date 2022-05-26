import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { TextAreaField, Label, TextArea } from "../styled/input";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <TextAreaField>
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className="form__input"
        placeholder=" "
      />{" "}
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      <ErrorMessage component={TextError} name={name} />
    </TextAreaField>
  );
}

export default Textarea;
