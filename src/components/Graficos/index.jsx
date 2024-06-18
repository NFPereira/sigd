import React from 'react'
import styles from './styles.module.css'

const Graficos = ({children}) => {
  return (
    <div className={styles.grafico}>{children}</div>
  )
}

export default Graficos