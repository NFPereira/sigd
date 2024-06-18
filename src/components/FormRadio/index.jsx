import React from 'react'
import styles from './styles.module.css'

const FormRadio = ({children}) => {
  return (
    <div className={styles.formRadio}>{children}</div>
  )
}

export default FormRadio