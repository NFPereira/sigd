import React from 'react'
import styles from './styles.module.css'

const Label = ({ name, children, classe}) => {
    return (
        <label className={classe}>{name}{children}</label>
    )
}

export default Label