import React from 'react'
import styles from './styles.module.css'

const FormGroup = ({ children }) => {
    return (
        <div className={styles.formGroup}>
            {children}
        </div>
    )
}

export default FormGroup