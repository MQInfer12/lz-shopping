import React from 'react'
import { Inputcontainer } from '../../style/input'

interface Props {
  state: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => any
  disabled?: boolean
  style?: any
  text: string
  danger?: string
  error?: string
}

const InputText = ({ text, disabled, handleChange, state, style, danger, error }: Props) => {
  return (
    <Inputcontainer error={!!error} danger={!!danger}>
      <label>{text}</label>
      <input 
        disabled={disabled}
        style={style} 
        value={state} 
        onChange={handleChange} 
        type="text"
      />
      {danger && 
      <>
        <i className="icon danger fa-solid fa-triangle-exclamation"></i>
        <small>{danger}</small>
      </>}
      {error && 
      <>
        <i className="icon error fa-solid fa-circle-exclamation"></i>
        <small>{error}</small>
      </>}
    </Inputcontainer>
  )
}

export default InputText