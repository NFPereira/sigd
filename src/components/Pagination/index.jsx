import React from 'react'
import styles from './styles.module.css'

const Pagination = ({ children }) => {
  return (
    <div className={styles.pagination}>
      {children}
    </div>
  )
}

export default Pagination 