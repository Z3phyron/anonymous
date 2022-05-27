import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import { InputField, Label } from '../styled/input'

function Input (props) {
  const { label, name, ...rest } = props
  return (
    <InputField>
      
      <Field id={name} name={name} {...rest} className='form__input' placeholder=" " />
      <Label htmlFor={name} className='form__label'>{label}</Label>
      <ErrorMessage component={TextError} name={name}  className='form__error'/>
    </InputField>
  )
}

export default Input
