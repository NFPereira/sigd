import React from 'react'
import styles from './styles.module.css'

const Select = ({ children, name, disabled, onchange, value }) => {
    return (
        <select disabled={disabled} name={name} className={styles.select} onChange={onchange} value={value}>{children}</select>
    )
}

export default Select 