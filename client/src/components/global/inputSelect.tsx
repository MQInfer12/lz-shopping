import React from 'react'
import { SelectContainer } from '../../style/input'

interface Props {
  small?: boolean
  text: string
  disabled?: boolean
  state: any
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
  options: {
    value: string | number,
    text: string | number
  }[]
  danger?: string
  error?: string
}

export const InputSelect = ({ handleChange, options, state, text, disabled, small, danger, error }: Props) => {
  return (
    <SelectContainer danger={!!danger} error={!!error} small={small}>
      <label>{text}</label>
      <select 
        disabled={disabled}
        value={state} 
        onChange={handleChange}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>{option.text}</option>
        ))}
      </select>
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
    </SelectContainer> 
  )
}
