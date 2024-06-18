import React from 'react'
import styles from './styles.module.css'

const Card = ({titulo, value}) => {
  return (
    <div className={styles.card}>
        <div className={styles.cardHeader}>{titulo}</div>
        <div className={styles.cardValue}>{value}</div>
    </div>
  )
}

export default Card