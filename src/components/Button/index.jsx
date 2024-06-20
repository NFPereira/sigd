import React from 'react'
import styles from './styles.module.css'

const Button = ({name, value, classe, onclick, onchange, id, icon }) => {
  return (
    <button id={id} value={value} className={classe} onClick={onclick} onChange={onchange}>
      {name}
    </button>
  )
}

export default Button