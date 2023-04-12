import React from 'react'
import { Inputcontainer } from '../../style/input'

interface Props {
  name: string
  state: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePlus: () => void
  handleMinus: () => void
  danger?: string
  error?: string
}

const InputNumber = ({ name, state, handleChange, handlePlus, handleMinus, danger, error }: Props) => {
  return (
    <Inputcontainer error={!!error} danger={!!danger}>
      <label>{ name }</label>
      <div className="input-relative">
        <input 
          type="number"
          value={state}
          onChange={handleChange}
        />
        <div className="controls">
          <button
            onClick={handleMinus}
          >-</button>
        </div>
        <div className="controls">
          <button
            onClick={handlePlus}
          >+</button>
        </div>
      </div>
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
export default InputNumber