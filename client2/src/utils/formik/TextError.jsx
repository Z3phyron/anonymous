import React from 'react'
import { Error } from '../styled/input'

function TextError (props) {
  return <Error className='error'>{props.children}</Error>
}

export default TextError
