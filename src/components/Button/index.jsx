import React from 'react'

const Button = ({name, value, classe, onclick, onchange, id }) => {
  return (
    <button id={id} value={value} className={classe} onClick={onclick} onChange={onchange}>
      {name}
    </button>
  )
}

export default Button