import React from 'react';
import styles from './styles.module.css';

const Navigator = ({children}) => {
  return (
    <div className={styles.navigator}>
        {children}
    </div>
  )
}

export default Navigator